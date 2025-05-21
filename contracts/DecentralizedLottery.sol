// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

error DecentralizedLottery_UpkeepNotNeeded();
error DecentralizedLottery_DrawNotReadyForProcessing();
error DecentralizedLottery_DrawNotReadyForVRF();
error DecentralizedLottery_DrawAlreadyProcessed();
error DecentralizedLottery_EarlyStartPreviousDrawNotFinalized();
error DecentralizedLottery_FailedToGetUniqueNumbers();
error DecentralizedLottery_InvalidDrawId();
error DecentralizedLottery_InvalidTicketNumbers();
error DecentralizedLottery_BettingClosedForDraw();
error DecentralizedLottery_IncorrectPayment();
error DecentralizedLottery_DrawNotFinalized();
error DecentralizedLottery_NoWinningsToClaim();
error DecentralizedLottery_TransferFailed();
error DecentralizedLottery_NoCommissionToWithdraw();
error DecentralizedLottery_InvalidPrice();
error DecentralizedLottery_InvalidInterval();
error DecentralizedLottery_NumbersNotAvailable();
error DecentralizedLottery_ProcessingWrongDraw();

contract DecentralizedLottery is
    VRFConsumerBaseV2Plus,
    AutomationCompatibleInterface
{
    uint256 public ticketPrice;
    uint256 public currentDrawId = 1;

    uint256 internal s_subscriptionId;
    bytes32 internal s_keyHash;
    uint32 internal s_callbackGasLimit = 200_000;
    uint16 internal s_requestConfirmations = 3;

    uint8 constant NUMBERS_PER_TICKET = 6;
    uint8 constant MAX_NUMBER = 49;
    uint32 constant NUM_WORDS_REQUESTED = NUMBERS_PER_TICKET + 1;
    uint8 constant COMMISSION_PCT = 10;

    uint256 public immutable i_drawInterval;
    uint256 public s_lastDrawTimestamp;

    enum DrawStatus {
        NOT_STARTED,
        VRF_REQUESTED,
        VRF_FULFILLED_NUMBERS_SET,
        RESULTS_CALCULATED
    }

    struct Ticket {
        address player;
        uint8[NUMBERS_PER_TICKET] numbers;
    }

    struct PrizeTierRule {
        uint8 mainMatches;
        bool extraMatched;
        uint8 percentage;
        string tierName;
    }

    mapping(uint256 => uint8[NUMBERS_PER_TICKET]) public drawnNumbers;
    mapping(uint256 => uint8) public extraNumber;
    mapping(uint256 => bool) public drawFinalized;
    mapping(uint256 => DrawStatus) public drawStatuses;
    mapping(uint256 => uint256) public s_vrfRequestIdToDrawId;
    mapping(uint256 => Ticket[]) public tickets;
    mapping(uint256 => uint256) public ticketCountForDraw;
    mapping(uint256 => mapping(address => uint256)) public winnings;

    uint256 public commissionBalance;
    uint256 public rolloverBalance;
    PrizeTierRule[] public prizeTierRules;

    event TicketPurchased(
        address indexed player,
        uint256 indexed drawId,
        uint256 ticketIndex,
        uint8[NUMBERS_PER_TICKET] numbers
    );
    event DrawNumbersRequested(
        uint256 indexed drawId,
        uint256 indexed vrfRequestId
    );
    event DrawNumbersFulfilled(
        uint256 indexed drawId,
        uint256 indexed vrfRequestId,
        uint8[NUMBERS_PER_TICKET] numbers,
        uint8 extra
    );
    event WinningResultsCalculationStarted(uint256 indexed drawId);
    event WinningResultsCalculated(
        uint256 indexed drawId,
        uint256 totalPrizePoolForWinners,
        uint256 newRolloverBalance
    );
    event PlayerWinningsRecorded(
        uint256 indexed drawId,
        address indexed player,
        uint256 amount
    );
    event PrizeClaimed(
        uint256 indexed drawId,
        address indexed player,
        uint256 amount
    );
    event CommissionWithdrawn(address indexed owner, uint256 amount);
    event RolloverBalanceUpdated(uint256 newRollover);
    event VrfParametersUpdated(
        uint256 newSubId,
        bytes32 newKeyHash,
        uint32 newCallbackGasLimit
    );

    constructor(
        address _vrfCoordinatorV25,
        uint256 _subscriptionId,
        bytes32 _keyHash,
        uint256 _ticketPriceWei,
        uint256 _drawIntervalSeconds
    ) VRFConsumerBaseV2Plus(_vrfCoordinatorV25) {
        if (_ticketPriceWei == 0)
            revert DecentralizedLottery_InvalidPrice();
        ticketPrice = _ticketPriceWei;

        s_subscriptionId = _subscriptionId;
        s_keyHash = _keyHash;

        if (_drawIntervalSeconds == 0)
            revert DecentralizedLottery_InvalidInterval();
        i_drawInterval = _drawIntervalSeconds;
        s_lastDrawTimestamp = block.timestamp;

        prizeTierRules.push(PrizeTierRule(6, false, 50, "6_matches"));
        prizeTierRules.push(PrizeTierRule(5, true, 20, "5_matches_plus_extra"));
        prizeTierRules.push(PrizeTierRule(5, false, 10, "5_matches_only"));
        prizeTierRules.push(PrizeTierRule(4, true, 7, "4_matches_plus_extra"));
        prizeTierRules.push(PrizeTierRule(4, false, 6, "4_matches_only"));
        prizeTierRules.push(PrizeTierRule(3, true, 4, "3_matches_plus_extra"));
        prizeTierRules.push(PrizeTierRule(3, false, 3, "3_matches_only"));
    }

    function purchaseTicket(
        uint8[NUMBERS_PER_TICKET] calldata _numbers
    ) external payable {
        if (msg.value != ticketPrice)
            revert DecentralizedLottery_IncorrectPayment();
        if (drawStatuses[currentDrawId] != DrawStatus.NOT_STARTED)
            revert DecentralizedLottery_BettingClosedForDraw();

        bool[MAX_NUMBER + 1] memory seen;
        for (uint i; i < NUMBERS_PER_TICKET; ++i) {
            uint8 num = _numbers[i];
            if (num < 1 || num > MAX_NUMBER || seen[num])
                revert DecentralizedLottery_InvalidTicketNumbers();
            seen[num] = true;
        }

        tickets[currentDrawId].push(Ticket(msg.sender, _numbers));
        ticketCountForDraw[currentDrawId] += 1;

        emit TicketPurchased(
            msg.sender,
            currentDrawId,
            tickets[currentDrawId].length - 1,
            _numbers
        );
    }

    function checkUpkeep(
        bytes calldata
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        bool timeForDraw = (block.timestamp - s_lastDrawTimestamp) > i_drawInterval;
        bool prevDone = (currentDrawId == 1) ||
            (drawStatuses[currentDrawId - 1] == DrawStatus.RESULTS_CALCULATED &&
                drawFinalized[currentDrawId - 1]);
        bool idle = drawStatuses[currentDrawId] == DrawStatus.NOT_STARTED;
        bool needVRF = timeForDraw && prevDone && idle;

        bool numbersReady = drawStatuses[currentDrawId] == DrawStatus.VRF_FULFILLED_NUMBERS_SET;
        bool notYetFinalized = !drawFinalized[currentDrawId];
        bool needFinalize = numbersReady && notYetFinalized;

        upkeepNeeded = needVRF || needFinalize;
        if (needVRF) {
            performData = abi.encode(uint8(0), currentDrawId);
        } else if (needFinalize) {
            performData = abi.encode(uint8(1), currentDrawId);
        }
    }

    function performUpkeep(bytes calldata performData) external override {
        (bool upkeepNeeded, ) = this.checkUpkeep("");
        if (!upkeepNeeded) 
            revert DecentralizedLottery_UpkeepNotNeeded();

        (uint8 action, uint256 drawIdToProcess) = abi.decode(performData, (uint8, uint256));

        if (action == 0) {
            if (drawIdToProcess != currentDrawId)
                revert DecentralizedLottery_ProcessingWrongDraw();
            if (drawStatuses[drawIdToProcess] != DrawStatus.NOT_STARTED)
                revert DecentralizedLottery_DrawNotReadyForVRF();

            s_lastDrawTimestamp = block.timestamp;
            drawStatuses[drawIdToProcess] = DrawStatus.VRF_REQUESTED;

            uint256 vrfRequestId = s_vrfCoordinator.requestRandomWords(
                VRFV2PlusClient.RandomWordsRequest({
                    keyHash: s_keyHash,
                    subId: s_subscriptionId,
                    requestConfirmations: s_requestConfirmations,
                    callbackGasLimit: s_callbackGasLimit,
                    numWords: NUM_WORDS_REQUESTED,
                    extraArgs: VRFV2PlusClient._argsToBytes(
                        VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                    )
                })
            );

            s_vrfRequestIdToDrawId[vrfRequestId] = drawIdToProcess;
            emit DrawNumbersRequested(drawIdToProcess, vrfRequestId);

        } else if (action == 1) {
            if (drawIdToProcess != currentDrawId)
                revert DecentralizedLottery_ProcessingWrongDraw();
            if (drawStatuses[drawIdToProcess] != DrawStatus.VRF_FULFILLED_NUMBERS_SET)
                revert DecentralizedLottery_DrawNotReadyForProcessing();

            this.processWinningsAndFinalizeDraw(drawIdToProcess);
        }
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] calldata _randomWords
    ) internal override {
        uint256 drawIdToFulfill = s_vrfRequestIdToDrawId[_requestId];
        if (drawIdToFulfill == 0)
            revert DecentralizedLottery_InvalidDrawId();
        if (drawStatuses[drawIdToFulfill] != DrawStatus.VRF_REQUESTED)
            revert DecentralizedLottery_DrawNotReadyForVRF();

        uint8[NUMBERS_PER_TICKET] memory localDrawnNumbers;
        uint8 localExtraNumber;

        uint8[] memory available = new uint8[](MAX_NUMBER);
        for (uint8 k; k < MAX_NUMBER; ++k)
            available[k] = k + 1;
        uint256 pool = MAX_NUMBER;

        for (uint i; i < NUMBERS_PER_TICKET; ++i) {
            if (pool == 0)
                revert DecentralizedLottery_FailedToGetUniqueNumbers();
            uint256 index = _randomWords[i] % pool;
            localDrawnNumbers[i] = available[index];
            available[index] = available[pool - 1];
            pool--;
        }
        if (pool == 0)
            revert DecentralizedLottery_FailedToGetUniqueNumbers();
        uint256 extraIdx = _randomWords[NUMBERS_PER_TICKET] % pool;
        localExtraNumber = available[extraIdx];

        drawnNumbers[drawIdToFulfill] = localDrawnNumbers;
        extraNumber[drawIdToFulfill] = localExtraNumber;
        drawStatuses[drawIdToFulfill] = DrawStatus.VRF_FULFILLED_NUMBERS_SET;

        emit DrawNumbersFulfilled(
            drawIdToFulfill,
            _requestId,
            localDrawnNumbers,
            localExtraNumber
        );
    }

    function startDrawEarly() external onlyOwner {
        bool previousDone = (currentDrawId == 1) ||
            (drawStatuses[currentDrawId - 1] == DrawStatus.RESULTS_CALCULATED &&
                drawFinalized[currentDrawId - 1]);
        if (!previousDone)
            revert DecentralizedLottery_EarlyStartPreviousDrawNotFinalized();
        if (drawStatuses[currentDrawId] != DrawStatus.NOT_STARTED)
            revert DecentralizedLottery_DrawNotReadyForVRF();

        uint256 drawIdToProcess = currentDrawId;
        drawStatuses[drawIdToProcess] = DrawStatus.VRF_REQUESTED;

        uint256 vrfRequestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: s_requestConfirmations,
                callbackGasLimit: s_callbackGasLimit,
                numWords: NUM_WORDS_REQUESTED,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        s_vrfRequestIdToDrawId[vrfRequestId] = drawIdToProcess;
        emit DrawNumbersRequested(drawIdToProcess, vrfRequestId);
    }

    function processWinningsAndFinalizeDraw(uint256 _drawId) external {
        if (drawStatuses[_drawId] != DrawStatus.VRF_FULFILLED_NUMBERS_SET)
            revert DecentralizedLottery_DrawNotReadyForProcessing();
        if (drawFinalized[_drawId])
            revert DecentralizedLottery_DrawAlreadyProcessed();

        emit WinningResultsCalculationStarted(_drawId);
        _calculateAndRecordWinningsInternal(_drawId);

        drawStatuses[_drawId] = DrawStatus.RESULTS_CALCULATED;
        drawFinalized[_drawId] = true;
        currentDrawId += 1;
    }

    function _calculateAndRecordWinningsInternal(uint256 _drawId) internal {
        uint8[NUMBERS_PER_TICKET] memory drawnMain = drawnNumbers[_drawId];
        uint8 extra = extraNumber[_drawId];
        Ticket[] storage ticketsForDraw = tickets[_drawId];

        (
            uint256 prizePool,
            uint256[] memory tierWinnerCounts,
            bool noTicketsSold
        ) = _calculatePrizePoolAndTierCounts(
                _drawId,
                drawnMain,
                extra,
                ticketsForDraw
            );

        if (noTicketsSold)
            return;

        _distributePrizesAndUpdateRollover(
            _drawId,
            prizePool,
            tierWinnerCounts,
            drawnMain,
            extra,
            ticketsForDraw
        );
    }

    function _calculatePrizePoolAndTierCounts(
        uint256 _drawId,
        uint8[NUMBERS_PER_TICKET] memory _drawnMain,
        uint8 _extraNum,
        Ticket[] storage _ticketsForDraw
    )
        internal
        returns (uint256 prizePool, uint256[] memory tierCounts, bool noTickets)
    {
        uint256 sold = ticketCountForDraw[_drawId];
        uint256 totalSales = sold * ticketPrice;
        uint256 commission = (totalSales * COMMISSION_PCT) / 100;
        commissionBalance += commission;

        prizePool = (totalSales - commission) + rolloverBalance;
        tierCounts = new uint256[](prizeTierRules.length);

        if (sold == 0) {
            rolloverBalance = prizePool;
            emit WinningResultsCalculated(_drawId, 0, rolloverBalance);
            emit RolloverBalanceUpdated(rolloverBalance);
            return (prizePool, tierCounts, true);
        }

        noTickets = false;

        for (uint i; i < _ticketsForDraw.length; ++i) {
            (uint8 mains, bool extraHit) = _countMatches(
                _ticketsForDraw[i].numbers,
                _drawnMain,
                _extraNum
            );
            for (uint j; j < prizeTierRules.length; ++j) {
                if (
                    _ticketQualifiesForTier(
                        prizeTierRules[j].mainMatches,
                        prizeTierRules[j].extraMatched,
                        mains,
                        extraHit
                    )
                ) {
                    tierCounts[j] += 1;
                    break;
                }
            }
        }
        return (prizePool, tierCounts, false);
    }

    function _distributePrizesAndUpdateRollover(
        uint256 _drawId,
        uint256 _prizePool,
        uint256[] memory _tierCounts,
        uint8[NUMBERS_PER_TICKET] memory _drawnMain,
        uint8 _extraNum,
        Ticket[] storage _ticketsForDraw
    ) internal {
        uint256 totalPaid;

        for (uint j; j < prizeTierRules.length; ++j) {
            PrizeTierRule storage rule = prizeTierRules[j];

            if (_tierCounts[j] == 0 || rule.percentage == 0)
                continue;

            uint256 tierTotal = (_prizePool * rule.percentage) / 100;
            uint256 perWinner = tierTotal / _tierCounts[j];
            if (perWinner == 0)
                continue;

            for (uint i; i < _ticketsForDraw.length; ++i) {
                totalPaid += _processSingleTicketForTier(
                    _drawId,
                    _ticketsForDraw[i],
                    _drawnMain,
                    _extraNum,
                    j,
                    perWinner
                );
            }
        }

        rolloverBalance = (totalPaid <= _prizePool)
            ? _prizePool - totalPaid
            : 0;

        emit WinningResultsCalculated(_drawId, totalPaid, rolloverBalance);
        emit RolloverBalanceUpdated(rolloverBalance);
    }

    function _processSingleTicketForTier(
        uint256 _drawId,
        Ticket storage _ticket,
        uint8[NUMBERS_PER_TICKET] memory _drawnMain,
        uint8 _extraNum,
        uint tierIndex,
        uint256 _perWinner
    ) internal returns (uint256) {
        (uint8 mains, bool extraHit) = _countMatches(
            _ticket.numbers,
            _drawnMain,
            _extraNum
        );

        if (_isBestQualifyingTierForTicket(mains, extraHit, tierIndex)) {
            winnings[_drawId][_ticket.player] += _perWinner;
            emit PlayerWinningsRecorded(_drawId, _ticket.player, _perWinner);
            return _perWinner;
        }
        return 0;
    }

    function _ticketQualifiesForTier(
        uint8 ruleMain,
        bool ruleExtra,
        uint8 actualMain,
        bool actualExtra
    ) internal pure returns (bool) {
        if (ruleMain != actualMain)
            return false;
        if (ruleMain == NUMBERS_PER_TICKET)
            return true;
        return ruleExtra ? actualExtra : !actualExtra;
    }

    function _isBestQualifyingTierForTicket(
        uint8 actualMain,
        bool actualExtra,
        uint tierIdx
    ) internal view returns (bool) {
        PrizeTierRule storage rule = prizeTierRules[tierIdx];
        if (
            !_ticketQualifiesForTier(
                rule.mainMatches,
                rule.extraMatched,
                actualMain,
                actualExtra
            )
        ) return false;

        for (uint k; k < tierIdx; ++k) {
            PrizeTierRule storage better = prizeTierRules[k];
            if (
                _ticketQualifiesForTier(
                    better.mainMatches,
                    better.extraMatched,
                    actualMain,
                    actualExtra
                )
            ) return false;
        }
        return true;
    }

    function _countMatches(
        uint8[NUMBERS_PER_TICKET] memory ticketNums,
        uint8[NUMBERS_PER_TICKET] memory drawnMain,
        uint8 drawnExtra
    ) internal pure returns (uint8 mainMatches, bool extraHit) {
        bool[MAX_NUMBER + 1] memory drawnSet;
        for (uint i; i < drawnMain.length; ++i)
            drawnSet[drawnMain[i]] = true;

        for (uint i; i < ticketNums.length; ++i) {
            uint8 n = ticketNums[i];
            if (drawnSet[n])
                mainMatches++;
            if (n == drawnExtra)
                extraHit = true;
        }
    }

    function claimPrize(uint256 _drawId) external {
        if (!drawFinalized[_drawId])
            revert DecentralizedLottery_DrawNotFinalized();

        uint256 amount = winnings[_drawId][msg.sender];
        if (amount == 0)
            revert DecentralizedLottery_NoWinningsToClaim();

        winnings[_drawId][msg.sender] = 0;
        (bool ok, ) = msg.sender.call{value: amount}("");
        if (!ok) {
            winnings[_drawId][msg.sender] = amount;
            revert DecentralizedLottery_TransferFailed();
        }
        emit PrizeClaimed(_drawId, msg.sender, amount);
    }

    function withdrawCommission() external onlyOwner {
        uint256 amount = commissionBalance;
        if (amount == 0)
            revert DecentralizedLottery_NoCommissionToWithdraw();

        commissionBalance = 0;
        (bool ok, ) = owner().call{value: amount}("");
        if (!ok) {
            commissionBalance = amount;
            revert DecentralizedLottery_TransferFailed();
        }
        emit CommissionWithdrawn(owner(), amount);
    }

    function setTicketPrice(uint256 _newPrice) external onlyOwner {
        if (_newPrice == 0)
            revert DecentralizedLottery_InvalidPrice();
        ticketPrice = _newPrice;
    }

    function setVrfParameters(
        uint256 _newSubId,
        bytes32 _newKeyHash,
        uint32 _newCallbackGasLimit
    ) external onlyOwner {
        s_subscriptionId = _newSubId;
        s_keyHash = _newKeyHash;
        s_callbackGasLimit = _newCallbackGasLimit;
        emit VrfParametersUpdated(_newSubId, _newKeyHash, _newCallbackGasLimit);
    }

    function getPlayerTicketsForDraw(
        address _player,
        uint256 _drawId
    ) external view returns (uint8[NUMBERS_PER_TICKET][] memory) {
        Ticket[] storage all = tickets[_drawId];
        uint count;
        for (uint i; i < all.length; ++i)
            if (all[i].player == _player)
                ++count;

        uint8[NUMBERS_PER_TICKET][]
            memory result = new uint8[NUMBERS_PER_TICKET][](count);
        uint idx;
        for (uint i; i < all.length; ++i) {
            if (all[i].player == _player) {
                result[idx++] = all[i].numbers;
            }
        }
        return result;
    }

    function checkWinnings(
        address _player,
        uint256 _drawId
    ) external view returns (uint256) {
        return winnings[_drawId][_player];
    }

    function getTicketCountForDrawView(
        uint256 _drawId
    ) external view returns (uint256) {
        return ticketCountForDraw[_drawId];
    }

    function getDrawStatusView(
        uint256 _drawId
    ) external view returns (DrawStatus) {
        return drawStatuses[_drawId];
    }

    function getCurrentDrawIdView() external view returns (uint256) {
        return currentDrawId;
    }

    function getRolloverBalanceView() external view returns (uint256) {
        return rolloverBalance;
    }

    function getVrfCoordinatorAddress() external view returns (address) {
        return address(s_vrfCoordinator);
    }

    function getVrfParametersView()
        external
        view
        returns (
            uint256 subId,
            bytes32 keyHash,
            uint32 callbackGasLimit,
            uint16 requestConfirmations
        )
    {
        return (
            s_subscriptionId,
            s_keyHash,
            s_callbackGasLimit,
            s_requestConfirmations
        );
    }

    function getDrawNumbersView(
        uint256 _drawId
    )
        external
        view
        returns (uint8[NUMBERS_PER_TICKET] memory main, uint8 extra)
    {
        DrawStatus status = drawStatuses[_drawId];
        if (
            status == DrawStatus.VRF_FULFILLED_NUMBERS_SET ||
            status == DrawStatus.RESULTS_CALCULATED
        ) {
            return (drawnNumbers[_drawId], extraNumber[_drawId]);
        }
        revert DecentralizedLottery_NumbersNotAvailable();
    }

    function checkVRF()
        external
        view
        returns (
            bool upkeepNeededVRF,
            bool timeForDraw,
            bool prevDone,
            bool idle,
            uint256 currentDrawIdToCheck
        )
    {
        timeForDraw = (block.timestamp - s_lastDrawTimestamp) > i_drawInterval;
        if (currentDrawId == 1) {
            prevDone = true;
        } else {
            prevDone = (drawStatuses[currentDrawId - 1] == DrawStatus.RESULTS_CALCULATED &&
                        drawFinalized[currentDrawId - 1]);
        }
        idle = drawStatuses[currentDrawId] == DrawStatus.NOT_STARTED;
        upkeepNeededVRF = timeForDraw && prevDone && idle;
        currentDrawIdToCheck = currentDrawId;

        return (upkeepNeededVRF, timeForDraw, prevDone, idle, currentDrawIdToCheck);
    }

    function checkFinalize()
        external
        view
        returns (
            bool upkeepNeededFinalize,
            uint256 currentDrawIdToFinalize,
            DrawStatus statusOfCurrentDraw,
            DrawStatus expectedStatusForFinalize,
            bool notYetFinalizedFlag
        )
    {
        currentDrawIdToFinalize = currentDrawId;
        statusOfCurrentDraw = drawStatuses[currentDrawIdToFinalize];
        expectedStatusForFinalize = DrawStatus.VRF_FULFILLED_NUMBERS_SET;
        notYetFinalizedFlag = !drawFinalized[currentDrawIdToFinalize];

        upkeepNeededFinalize = (statusOfCurrentDraw == expectedStatusForFinalize) && notYetFinalizedFlag;

        return (
            upkeepNeededFinalize,
            currentDrawIdToFinalize,
            statusOfCurrentDraw,
            expectedStatusForFinalize,
            notYetFinalizedFlag
        );
    }

    receive() external payable {}
    fallback() external payable {}
}
