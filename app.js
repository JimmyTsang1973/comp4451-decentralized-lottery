const CONTRACT_ADDRESS = "0xa06e341267ac74ac87c025f5b2a4564d03d19fdc";
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_vrfCoordinatorV25",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_subscriptionId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_keyHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_ticketPriceWei",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_drawIntervalSeconds",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_BettingClosedForDraw",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_DrawAlreadyProcessed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_DrawNotFinalized",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_DrawNotReadyForProcessing",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_DrawNotReadyForVRF",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_EarlyStartPreviousDrawNotFinalized",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_FailedToGetUniqueNumbers",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_IncorrectPayment",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_InvalidDrawId",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_InvalidInterval",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_InvalidPrice",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_InvalidTicketNumbers",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_NoCommissionToWithdraw",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_NoWinningsToClaim",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_NumbersNotAvailable",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_ProcessingWrongDraw",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_TransferFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DecentralizedLottery_UpkeepNotNeeded",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "have",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "want",
				"type": "address"
			}
		],
		"name": "OnlyCoordinatorCanFulfill",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "have",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "coordinator",
				"type": "address"
			}
		],
		"name": "OnlyOwnerOrCoordinator",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ZeroAddress",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "CommissionWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "vrfCoordinator",
				"type": "address"
			}
		],
		"name": "CoordinatorSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "drawId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vrfRequestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8[6]",
				"name": "numbers",
				"type": "uint8[6]"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "extra",
				"type": "uint8"
			}
		],
		"name": "DrawNumbersFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "drawId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vrfRequestId",
				"type": "uint256"
			}
		],
		"name": "DrawNumbersRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "drawId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PlayerWinningsRecorded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "drawId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PrizeClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newRollover",
				"type": "uint256"
			}
		],
		"name": "RolloverBalanceUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "drawId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ticketIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8[6]",
				"name": "numbers",
				"type": "uint8[6]"
			}
		],
		"name": "TicketPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newSubId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "newKeyHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "newCallbackGasLimit",
				"type": "uint32"
			}
		],
		"name": "VrfParametersUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "drawId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalPrizePoolForWinners",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newRolloverBalance",
				"type": "uint256"
			}
		],
		"name": "WinningResultsCalculated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "drawId",
				"type": "uint256"
			}
		],
		"name": "WinningResultsCalculationStarted",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkFinalize",
		"outputs": [
			{
				"internalType": "bool",
				"name": "upkeepNeededFinalize",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "currentDrawIdToFinalize",
				"type": "uint256"
			},
			{
				"internalType": "enum DecentralizedLottery.DrawStatus",
				"name": "statusOfCurrentDraw",
				"type": "uint8"
			},
			{
				"internalType": "enum DecentralizedLottery.DrawStatus",
				"name": "expectedStatusForFinalize",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "notYetFinalizedFlag",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "checkUpkeep",
		"outputs": [
			{
				"internalType": "bool",
				"name": "upkeepNeeded",
				"type": "bool"
			},
			{
				"internalType": "bytes",
				"name": "performData",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkVRF",
		"outputs": [
			{
				"internalType": "bool",
				"name": "upkeepNeededVRF",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "timeForDraw",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "prevDone",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "idle",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "currentDrawIdToCheck",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_drawId",
				"type": "uint256"
			}
		],
		"name": "checkWinnings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_drawId",
				"type": "uint256"
			}
		],
		"name": "claimPrize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "commissionBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentDrawId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "drawFinalized",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "drawStatuses",
		"outputs": [
			{
				"internalType": "enum DecentralizedLottery.DrawStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "drawnNumbers",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "extraNumber",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentDrawIdView",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_drawId",
				"type": "uint256"
			}
		],
		"name": "getDrawNumbersView",
		"outputs": [
			{
				"internalType": "uint8[6]",
				"name": "main",
				"type": "uint8[6]"
			},
			{
				"internalType": "uint8",
				"name": "extra",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_drawId",
				"type": "uint256"
			}
		],
		"name": "getDrawStatusView",
		"outputs": [
			{
				"internalType": "enum DecentralizedLottery.DrawStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_drawId",
				"type": "uint256"
			}
		],
		"name": "getPlayerTicketsForDraw",
		"outputs": [
			{
				"internalType": "uint8[6][]",
				"name": "",
				"type": "uint8[6][]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRolloverBalanceView",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_drawId",
				"type": "uint256"
			}
		],
		"name": "getTicketCountForDrawView",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVrfCoordinatorAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVrfParametersView",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "subId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "keyHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint32",
				"name": "callbackGasLimit",
				"type": "uint32"
			},
			{
				"internalType": "uint16",
				"name": "requestConfirmations",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "i_drawInterval",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "performData",
				"type": "bytes"
			}
		],
		"name": "performUpkeep",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "prizeTierRules",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "mainMatches",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "extraMatched",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "percentage",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "tierName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_drawId",
				"type": "uint256"
			}
		],
		"name": "processWinningsAndFinalizeDraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8[6]",
				"name": "_numbers",
				"type": "uint8[6]"
			}
		],
		"name": "purchaseTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "randomWords",
				"type": "uint256[]"
			}
		],
		"name": "rawFulfillRandomWords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rolloverBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_lastDrawTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_vrfCoordinator",
		"outputs": [
			{
				"internalType": "contract IVRFCoordinatorV2Plus",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "s_vrfRequestIdToDrawId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_vrfCoordinator",
				"type": "address"
			}
		],
		"name": "setCoordinator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "setTicketPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newSubId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_newKeyHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint32",
				"name": "_newCallbackGasLimit",
				"type": "uint32"
			}
		],
		"name": "setVrfParameters",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startDrawEarly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ticketCountForDraw",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticketPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tickets",
		"outputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "winnings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawCommission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

let provider;
let signer;
let contract;
let userAddress;
let contractOwnerAddress;
let contractErrorMap = {};

const DrawStatus = {
    NOT_STARTED: 0,
    VRF_REQUESTED: 1,
    VRF_FULFILLED_NUMBERS_SET: 2,
    RESULTS_CALCULATED: 3
};
const DrawStatusNames = ["Not Started", "VRF Requested", "VRF Fulfilled, Numbers Set", "Results Calculated"];
const connectWalletBtn = document.getElementById('connectWalletBtn');
const connectedAccountSpan = document.getElementById('connectedAccount');
const contractAddressDisplay = document.getElementById('contractAddressDisplay');
const ownerAddressSpan = document.getElementById('ownerAddress');
const ticketPriceSpan = document.getElementById('ticketPrice');
const currentDrawIdSpan = document.getElementById('currentDrawId');
const rolloverBalanceSpan = document.getElementById('rolloverBalance');
const commissionBalanceSpan = document.getElementById('commissionBalance');
const refreshInfoBtn = document.getElementById('refreshInfoBtn');
const purchaseDrawIdSpan = document.getElementById('purchaseDrawId');
const ticketNumbersInput = document.getElementById('ticketNumbers');
const purchaseTicketBtn = document.getElementById('purchaseTicketBtn');
const checkWinningsDrawIdInput = document.getElementById('checkWinningsDrawId');
const checkWinningsBtn = document.getElementById('checkWinningsBtn');
const winningsAmountSpan = document.getElementById('winningsAmount');
const claimPrizeDrawIdInput = document.getElementById('claimPrizeDrawId');
const claimPrizeBtn = document.getElementById('claimPrizeBtn');
const viewTicketsDrawIdInput = document.getElementById('viewTicketsDrawId');
const viewPlayerTicketsBtn = document.getElementById('viewPlayerTicketsBtn');
const playerTicketsDisplay = document.getElementById('playerTicketsDisplay');
const ticketCountDrawIdInput = document.getElementById('ticketCountDrawId');
const getTicketCountBtn = document.getElementById('getTicketCountBtn');
const ticketCountResultSpan = document.getElementById('ticketCountResult');
const viewDrawDetailsIdInput = document.getElementById('viewDrawDetailsId');
const viewDrawDetailsBtn = document.getElementById('viewDrawDetailsBtn');
const drawStatusDisplaySpan = document.getElementById('drawStatusDisplay');
const drawnNumbersDisplaySpan = document.getElementById('drawnNumbersDisplay');
const extraNumberDisplaySpan = document.getElementById('extraNumberDisplay');
const ownerActionsSection = document.getElementById('ownerActionsSection');
const startEarlyDrawIdDisplaySpan = document.getElementById('startEarlyDrawIdDisplay');
const startDrawEarlyBtn = document.getElementById('startDrawEarlyBtn');
const finalizeDrawIdInput = document.getElementById('finalizeDrawId');
const processWinningsBtn = document.getElementById('processWinningsBtn');
const withdrawCommissionBtn = document.getElementById('withdrawCommissionBtn');
const commissionBalanceForWithdrawSpan = document.getElementById('commissionBalanceForWithdraw');
const eventsLog = document.getElementById('eventsLog');

window.addEventListener('load', async () => {
    if (!CONTRACT_ADDRESS) {
        logStatus("ERROR: Contract address not set in app.js. Please configure it.");
        alert("Contract address not set. Please edit app.js and set the CONTRACT_ADDRESS.");
        return;
    }
     if (CONTRACT_ABI.length === 0 || (CONTRACT_ABI.length === 1 && CONTRACT_ABI[0].includes("PASTE YOUR CONTRACT ABI HERE"))) {
        logStatus("ERROR: Contract ABI not set in app.js. Please configure it.");
        alert("Contract ABI not set or is placeholder. Please edit app.js and set the CONTRACT_ABI.");
        return;
    }

    initializeErrorMap();

    contractAddressDisplay.textContent = CONTRACT_ADDRESS;

    connectWalletBtn.addEventListener('click', connectWallet);
    refreshInfoBtn.addEventListener('click', loadGeneralContractInfo);
    purchaseTicketBtn.addEventListener('click', handlePurchaseTicket);
    checkWinningsBtn.addEventListener('click', handleCheckWinnings);
    claimPrizeBtn.addEventListener('click', handleClaimPrize);
    viewPlayerTicketsBtn.addEventListener('click', handleViewPlayerTickets);
    getTicketCountBtn.addEventListener('click', handleGetTicketCount);
    viewDrawDetailsBtn.addEventListener('click', handleViewDrawDetails);

    startDrawEarlyBtn.addEventListener('click', handleStartDrawEarly);
    processWinningsBtn.addEventListener('click', handleProcessWinnings);
    withdrawCommissionBtn.addEventListener('click', handleWithdrawCommission);

    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
        
        try {
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
                await connectWallet(true);
            }
        } catch (e) {
            console.warn("Auto-connect failed or no accounts found yet.", e);
        }
    } else {
        logStatus("MetaMask not detected. Please install MetaMask!");
        alert("MetaMask not detected. Please install MetaMask!");
    }
});

function initializeErrorMap() {
    if (CONTRACT_ABI && CONTRACT_ABI.length > 0) {
        CONTRACT_ABI.forEach(item => {
            if (item.type === "error") {
                const inputTypes = item.inputs.map(input => input.type).join(',');
                const signature = `${item.name}(${inputTypes})`;
                const selector = ethers.utils.id(signature).substring(0, 10);
                contractErrorMap[selector] = item.name;
            }
        });
        console.log("Initialized Contract Error Map:", contractErrorMap);
        logStatus("Contract error map initialized.");
    } else {
        console.error("CONTRACT_ABI is not available for error map initialization.");
        logStatus("Warning: Contract ABI not available, custom error messages may not work.");
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        logStatus('Please connect to MetaMask.');
        userAddress = null;
        signer = null;
        contract = null;
        connectedAccountSpan.textContent = "Not Connected";
        ownerActionsSection.style.display = 'none';
    } else {
        userAddress = accounts[0];
        connectedAccountSpan.textContent = `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`;
        if (provider) {
            signer = provider.getSigner();
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            loadGeneralContractInfo();
            checkIfOwner();
            setupEventListeners();
        }
    }
}

async function connectWallet(isAutoConnect = false) {
    if (!window.ethereum) {
        logStatus("MetaMask is not installed!");
        return;
    }
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accounts);
        logStatus("Wallet connected.");
    } catch (error) {
        if (error.code === 4001) {
            logStatus("Connection request denied by user.");
        } else {
            logStatus(`Error connecting wallet: ${getFriendlyErrorMessage(error)}`);
        }
        console.error("Error connecting wallet:", error);
    }
}

async function loadGeneralContractInfo() {
    if (!contract) {
        logStatus("Contract not initialized. Connect wallet first.");
        return;
    }
    logStatus("Refreshing contract info...");
    try {
        const [price, cDrawId, rollover, commission, owner] = await Promise.all([
            contract.ticketPrice(),
            contract.currentDrawId(),
            contract.rolloverBalance(),
            contract.commissionBalance(),
            contract.owner()
        ]);

        ticketPriceSpan.textContent = ethers.utils.formatEther(price);
        currentDrawIdSpan.textContent = cDrawId.toString();
        purchaseDrawIdSpan.textContent = cDrawId.toString();
        startEarlyDrawIdDisplaySpan.textContent = cDrawId.toString();
        rolloverBalanceSpan.textContent = ethers.utils.formatEther(rollover);
        commissionBalanceSpan.textContent = ethers.utils.formatEther(commission);
        commissionBalanceForWithdrawSpan.textContent = ethers.utils.formatEther(commission);
        ownerAddressSpan.textContent = owner;
        contractOwnerAddress = owner;

        checkIfOwner();
        logStatus("Contract info refreshed.");
    } catch (error) {
        logStatus(`Error loading contract info: ${getFriendlyErrorMessage(error)}`);
        console.error("Error loading contract info:", error);
    }
}

function checkIfOwner() {
    if (userAddress && contractOwnerAddress && userAddress.toLowerCase() === contractOwnerAddress.toLowerCase()) {
        ownerActionsSection.style.display = 'block';
    } else {
        ownerActionsSection.style.display = 'none';
    }
}

async function handlePurchaseTicket() {
    if (!contract || !signer) {
        logStatus("Please connect wallet first.");
        return;
    }
    const numbersStr = ticketNumbersInput.value;
    const numbersArray = numbersStr.split(',').map(n => parseInt(n.trim(), 10));

    if (numbersArray.length !== 6 || numbersArray.some(isNaN)) {
        logStatus("Invalid numbers. Enter 6 comma-separated numbers.");
        return;
    }
    const uniqueNumbers = new Set(numbersArray);
    if (uniqueNumbers.size !== 6) {
        logStatus("Numbers must be unique.");
        return;
    }
    if (numbersArray.some(n => n < 1 || n > 49)) {
        logStatus("Numbers must be between 1 and 49.");
        return;
    }

    try {
        const price = await contract.ticketPrice();
        logStatus(`Purchasing ticket for ${ethers.utils.formatEther(price)} ETH with numbers: ${numbersArray.join(', ')}...`);
        const tx = await contract.purchaseTicket(numbersArray, { value: price });
        logStatus(`Transaction sent: ${tx.hash}. Waiting for confirmation...`);
        await tx.wait();
        logStatus("Ticket purchased successfully!");
        ticketNumbersInput.value = "";
        loadGeneralContractInfo();
    } catch (error) {
        logStatus(`Error purchasing ticket: ${getFriendlyErrorMessage(error)}`);
        console.error("Error purchasing ticket:", error);
    }
}

async function handleCheckWinnings() {
    if (!contract || !userAddress) {
        logStatus("Please connect wallet first.");
        return;
    }
    const drawId = checkWinningsDrawIdInput.value;
    if (!drawId) {
        logStatus("Please enter a Draw ID.");
        return;
    }
    try {
        logStatus(`Checking winnings for draw ${drawId} for account ${userAddress}...`);
        const winnings = await contract.checkWinnings(userAddress, parseInt(drawId));
        winningsAmountSpan.textContent = ethers.utils.formatEther(winnings);
        if (winnings.gt(0)) {
            logStatus(`You have winnings of ${ethers.utils.formatEther(winnings)} ETH for draw ${drawId}.`);
        } else {
            logStatus(`No winnings for draw ${drawId}.`);
        }
    } catch (error) {
        logStatus(`Error checking winnings: ${getFriendlyErrorMessage(error)}`);
        console.error("Error checking winnings:", error);
    }
}

async function handleClaimPrize() {
    if (!contract || !signer) {
        logStatus("Please connect wallet first.");
        return;
    }
    const drawId = claimPrizeDrawIdInput.value;
    if (!drawId) {
        logStatus("Please enter a Draw ID to claim prize from.");
        return;
    }
    try {
        logStatus(`Attempting to claim prize for draw ${drawId}...`);
        const tx = await contract.claimPrize(parseInt(drawId));
        logStatus(`Transaction sent: ${tx.hash}. Waiting for confirmation...`);
        await tx.wait();
        logStatus("Prize claimed successfully!");
        loadGeneralContractInfo();
        winningsAmountSpan.textContent = "0";
    } catch (error) {
        logStatus(`Error claiming prize: ${getFriendlyErrorMessage(error)}`);
        console.error("Error claiming prize:", error);
    }
}

async function handleViewPlayerTickets() {
    if (!contract || !userAddress) {
        logStatus("Please connect wallet first.");
        return;
    }
    const drawId = viewTicketsDrawIdInput.value;
    if (!drawId) {
        logStatus("Please enter a Draw ID.");
        return;
    }
    playerTicketsDisplay.innerHTML = "Loading tickets...";
    try {
        const tickets = await contract.getPlayerTicketsForDraw(userAddress, parseInt(drawId));
        if (tickets.length === 0) {
            playerTicketsDisplay.innerHTML = "No tickets found for this draw.";
            logStatus(`No tickets found for player for draw ${drawId}.`);
        } else {
            playerTicketsDisplay.innerHTML = tickets.map((ticket, index) => 
                `<div>Ticket ${index + 1}: [${ticket.join(', ')}]</div>`
            ).join('');
            logStatus(`Displayed ${tickets.length} tickets for draw ${drawId}.`);
        }
    } catch (error) {
        playerTicketsDisplay.innerHTML = "Error fetching tickets.";
        logStatus(`Error viewing player tickets: ${getFriendlyErrorMessage(error)}`);
        console.error("Error viewing player tickets:", error);
    }
}

async function handleGetTicketCount() {
    if (!contract) {
        logStatus("Please connect wallet first.");
        return;
    }
    const drawId = ticketCountDrawIdInput.value;
    if (!drawId) {
        logStatus("Please enter a Draw ID.");
        return;
    }
    try {
        const count = await contract.getTicketCountForDrawView(parseInt(drawId));
        ticketCountResultSpan.textContent = count.toString();
        logStatus(`Ticket count for draw ${drawId} is ${count.toString()}.`);
    } catch (error) {
        logStatus(`Error getting ticket count: ${getFriendlyErrorMessage(error)}`);
        console.error("Error getting ticket count:", error);
        try {
            const count = await contract.ticketCountForDraw(parseInt(drawId));
            ticketCountResultSpan.textContent = count.toString();
            logStatus(`Ticket count for draw ${drawId} is ${count.toString()} (using mapping getter).`);
        } catch (fallbackError) {
             logStatus(`Error getting ticket count (fallback): ${getFriendlyErrorMessage(fallbackError)}`);
             console.error("Error getting ticket count (fallback):", fallbackError);
        }
    }
}


async function handleViewDrawDetails() {
    if (!contract) {
        logStatus("Please connect wallet first.");
        return;
    }
    const drawId = viewDrawDetailsIdInput.value;
    if (!drawId) {
        logStatus("Please enter a Draw ID to view details.");
        return;
    }
    logStatus(`Fetching details for draw ${drawId}...`);
    drawStatusDisplaySpan.textContent = "Loading...";
    drawnNumbersDisplaySpan.textContent = "N/A";
    extraNumberDisplaySpan.textContent = "N/A";

    try {
        const statusEnum = await contract.getDrawStatusView(parseInt(drawId));
        drawStatusDisplaySpan.textContent = DrawStatusNames[statusEnum] || `Unknown (${statusEnum})`;

        if (statusEnum === DrawStatus.VRF_FULFILLED_NUMBERS_SET || statusEnum === DrawStatus.RESULTS_CALCULATED) {
            try {
                const { main, extra } = await contract.getDrawNumbersView(parseInt(drawId));
                drawnNumbersDisplaySpan.textContent = `[${main.join(', ')}]`;
                extraNumberDisplaySpan.textContent = extra.toString();
                logStatus(`Draw ${drawId} details: Status=${DrawStatusNames[statusEnum]}, Numbers=[${main.join(', ')}], Extra=${extra}`);
            } catch (numError) {
                logStatus(`Could not fetch numbers for draw ${drawId}, though status suggests they should be available: ${getFriendlyErrorMessage(numError)}`);
                drawnNumbersDisplaySpan.textContent = "Error fetching";
                extraNumberDisplaySpan.textContent = "Error fetching";
            }
        } else {
            logStatus(`Draw ${drawId} details: Status=${DrawStatusNames[statusEnum]}. Numbers not yet available.`);
        }
    } catch (error) {
        logStatus(`Error fetching draw details: ${getFriendlyErrorMessage(error)}`);
        console.error("Error fetching draw details:", error);
        drawStatusDisplaySpan.textContent = "Error";
    }
}

async function handleStartDrawEarly() {
    if (!contract || !signer) {
        logStatus("Please connect wallet and ensure you are the owner.");
        return;
    }
    try {
        logStatus("Attempting to start draw early...");
        const tx = await contract.startDrawEarly();
        logStatus(`Transaction sent: ${tx.hash}. Waiting for confirmation...`);
        await tx.wait();
        logStatus("Start draw early successful! VRF request initiated.");
        loadGeneralContractInfo();
    } catch (error) {
        logStatus(`Error starting draw early: ${getFriendlyErrorMessage(error)}`);
        console.error("Error starting draw early:", error);
    }
}

async function handleProcessWinnings() {
    if (!contract || !signer) {
        logStatus("Please connect wallet and ensure you are the owner (or anyone if permitted).");
        return;
    }
    const drawId = finalizeDrawIdInput.value;
    if (!drawId) {
        logStatus("Please enter a Draw ID to finalize.");
        return;
    }
    try {
        logStatus(`Attempting to process winnings and finalize draw ${drawId}...`);
        const tx = await contract.processWinningsAndFinalizeDraw(parseInt(drawId));
        logStatus(`Transaction sent: ${tx.hash}. Waiting for confirmation...`);
        await tx.wait();
        logStatus(`Draw ${drawId} processed and finalized successfully!`);
        loadGeneralContractInfo();
    } catch (error) {
        logStatus(`Error processing winnings: ${getFriendlyErrorMessage(error)}`);
        console.error("Error processing winnings:", error);
    }
}

async function handleWithdrawCommission() {
    if (!contract || !signer) {
        logStatus("Please connect wallet and ensure you are the owner.");
        return;
    }
    try {
        logStatus("Attempting to withdraw commission...");
        const tx = await contract.withdrawCommission();
        logStatus(`Transaction sent: ${tx.hash}. Waiting for confirmation...`);
        await tx.wait();
        logStatus("Commission withdrawn successfully!");
        loadGeneralContractInfo();
    } catch (error) {
        logStatus(`Error withdrawing commission: ${getFriendlyErrorMessage(error)}`);
        console.error("Error withdrawing commission:", error);
    }
}

function setupEventListeners() {
    if (!contract) return;

    contract.removeAllListeners(); 

    logStatus("Setting up contract event listeners...");

    contract.on("TicketPurchased", (player, drawId, ticketIndex, numbers, event) => {
        logEvent(`Ticket Purchased: Player ${player.substring(0,6)}... bought ticket ${ticketIndex} for draw ${drawId} with numbers [${numbers.join(', ')}]`);
        if (drawId.toString() === currentDrawIdSpan.textContent) {
            
        }
    });

    contract.on("DrawNumbersRequested", (drawId, vrfRequestId, event) => {
        logEvent(`Draw Numbers Requested: Draw ${drawId}, VRF Request ID ${vrfRequestId.toString().substring(0,10)}...`);
    });

    contract.on("DrawNumbersFulfilled", (drawId, vrfRequestId, numbers, extra, event) => {
        logEvent(`Draw Numbers Fulfilled: Draw ${drawId}, Numbers [${numbers.join(', ')}], Extra ${extra}`);
        if (viewDrawDetailsIdInput.value === drawId.toString()){
            handleViewDrawDetails();
        }
    });
    
    contract.on("WinningResultsCalculated", (drawId, totalPrizePoolForWinners, newRolloverBalance, event) => {
        logEvent(`Winning Results Calculated: Draw ${drawId}, Total Prizes ${ethers.utils.formatEther(totalPrizePoolForWinners)} ETH, New Rollover ${ethers.utils.formatEther(newRolloverBalance)} ETH`);
        loadGeneralContractInfo();
    });

    contract.on("PrizeClaimed", (drawId, player, amount, event) => {
        logEvent(`Prize Claimed: Player ${player.substring(0,6)}... claimed ${ethers.utils.formatEther(amount)} ETH from draw ${drawId}`);
        if (player.toLowerCase() === userAddress?.toLowerCase() && drawId.toString() === claimPrizeDrawIdInput.value) {
            winningsAmountSpan.textContent = "0";
        }
    });
    
    contract.on("CommissionWithdrawn", (owner, amount, event) => {
        logEvent(`Commission Withdrawn: Owner ${owner.substring(0,6)}... withdrew ${ethers.utils.formatEther(amount)} ETH`);
        loadGeneralContractInfo();
    });

    logStatus("Event listeners active.");
}

function logStatus(message) {
    console.log(message);
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${timeString}] ${message}`;
    eventsLog.insertBefore(logEntry, eventsLog.firstChild);
    const maxLogs = 50;
    while (eventsLog.children.length > maxLogs) {
        eventsLog.removeChild(eventsLog.lastChild);
    }
}

function logEvent(message) {
    logStatus(`EVENT: ${message}`);
}

function getFriendlyErrorMessage(error) {
    let customErrorData = null;

    if (error.error && error.error.data && typeof error.error.data === 'string' && error.error.data.startsWith('0x')) {
        customErrorData = error.error.data;
    }
    else if (error.data && typeof error.data === 'string' && error.data.startsWith('0x')) {
        customErrorData = error.data;
    }

    if (customErrorData) {
        const selector = customErrorData.substring(0, 10);
        if (contractErrorMap[selector]) {
            let friendlyName = contractErrorMap[selector];
            if (friendlyName.startsWith("DecentralizedLottery_")) {
                friendlyName = friendlyName.substring("DecentralizedLottery_".length);
            }
            friendlyName = friendlyName.replace(/_/g, " ");
            return `Contract Rejection: ${friendlyName}.`;
        }
    }
    
    if (error.reason) {
        if (error.reason.toLowerCase() === "execution reverted" && error.error && error.error.message) {
            const nestedMsg = error.error.message;
            if (nestedMsg.includes("reverted with reason string")) {
                const match = nestedMsg.match(/'([^']*)'/);
                if (match && match[1]) return `Transaction Reverted: ${match[1]}`;
            } else if (!nestedMsg.startsWith("execution reverted")) {
                return nestedMsg;
            }
        }
        return `Error: ${error.reason}`;
    }

    if (error.message) {
        if (error.message.startsWith("cannot estimate gas;")) {
             return "Transaction failed: Could not estimate gas. The transaction would likely fail.";
        }
        return error.message;
    }

    return "An unknown error occurred. Check the console for details.";
}
