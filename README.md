# COMP4541 Lottery DApp

A decentralized lottery application built on the Ethereum blockchain, inspired by the Hong Kong Mark Six. This DApp allows users to purchase lottery tickets, participate in draws with provably fair random number generation (via Chainlink VRF), check winnings, and claim prizes securely and transparently.

## Features

*   **Wallet Integration:** Connects with MetaMask for user authentication and transactions.
*   **Ticket Purchase:** Users can buy tickets by selecting 6 unique numbers (1-49) for the current draw.
*   **Provably Fair Draws:** Utilizes Chainlink VRF V2Plus for secure and verifiable random number generation for draw outcomes (6 main numbers + 1 extra number).
*   **Automated Draw Mechanics:** Designed to work with Chainlink Automation for timely draw processing (can also be triggered manually by the owner or other participants under certain conditions).
*   **Tiered Prize Structure:** Multiple prize tiers based on the number of matched main numbers and the extra number.
*   **Rollover Jackpots:** Unclaimed top-tier prize money rolls over to the next draw.
*   **Winnings & Claims:** Users can check their winnings for any draw and claim their prizes directly to their wallet.
*   **Contract Information Display:** Shows key contract details like owner, ticket price, current draw ID, and balances.
*   **Owner-Specific Actions:**
    *   Start draws early.
    *   Process winnings and finalize draws.
    *   Withdraw accumulated commission.
*   **Event Logging:** Displays real-time contract events and status updates on the frontend.

## Technology Stack

*   **Smart Contract:**
    *   Solidity
    *   Chainlink VRF V2Plus Consumer
    *   Chainlink Automation Compatible
*   **Frontend:**
    *   HTML5
    *   CSS3
    *   JavaScript (ES6+)
    *   Ethers.js (v5)
*   **Blockchain:**
    *   Ethereum (Sepolia Testnet)
*   **Wallet:**
    *   MetaMask

## Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Brave).
*   MetaMask browser extension installed.
*   SepoliaETH in your MetaMask wallet to pay for gas fees and ticket purchases on the Sepolia testnet. You can get SepoliaETH from a faucet (e.g., [sepoliafaucet.com](https://sepoliafaucet.com/), [infura.io/faucet/sepolia](https://www.infura.io/faucet/sepolia)).

## Smart Contract Details

The `DecentralizedLottery.sol` contract is deployed and configured to interact with Chainlink services.

*   **Ethereum Testnet Used:** **Sepolia**
*   **Deployed Contract Address:** `0xa06e341267ac74ac87c025f5b2a4564d03d19fdc`
*   **View on Etherscan (Sepolia):** [https://sepolia.etherscan.io/address/0xa06e341267ac74ac87c025f5b2a4564d03d19fdc](https://sepolia.etherscan.io/address/0xa06e341267ac74ac87c025f5b2a4564d03d19fdc)
*   **Contract ABI:** The ABI is included directly in `app.js`.

## Frontend Setup & Access

The DApp frontend allows users to interact with the deployed smart contract.
**Accessing the Hosted Frontend:**
*   The DApp frontend is hosted at: **`http://jimmytsang1973.github.io/comp4451-decentralized-lottery`**

## How to Play

1.  **Connect Wallet:** Click the "Connect Wallet" button and approve the connection in MetaMask. Ensure you are on the Sepolia testnet.
2.  **Purchase Ticket:**
    *   Verify the "Current Draw ID for New Tickets."
    *   In the "Purchase Ticket" section, enter 6 unique numbers (comma-separated, e.g., `1,5,10,23,30,45`) between 1 and 49.
    *   Click "Purchase Ticket" and confirm the transaction in MetaMask (this will include the ticket price + gas fee).
3.  **Wait for Draw:** Draws are processed automatically by Chainlink Automation after a set interval or can be started early by the contract owner. You can check the "Draw Status" under "View Draw Details."
4.  **Check Winnings:**
    *   Enter the "Draw ID" you participated in.
    *   Click "Check Winnings." The amount you won (if any) will be displayed.
5.  **Claim Prize:**
    *   If you have winnings for a draw, enter the "Draw ID."
    *   Click "Claim Prize" and confirm the transaction in MetaMask to receive your ETH.
6.  **Refresh & Explore:**
    *   Use "Refresh Info" to get the latest contract state.
    *   Explore other features like viewing your tickets, getting ticket counts, and draw details.

## Key Files

*   `index.html`: The main structure of the DApp frontend.
*   `css/style.css`: CSS styles for the frontend.
*   `js/app.js`: Contains all the JavaScript logic for frontend interactions, Ethers.js setup, contract ABI, and contract address.
*   `contracts/DecentralizedLottery.sol`: The Solidity smart contract code.

## Security Notes

*   This DApp is deployed on the Sepolia **testnet**. Do not use real Ether.
*   The smart contract uses Chainlink VRF for provably fair randomness.
*   Owner-privileged functions are restricted to the contract owner.
*   Always review transactions before confirming them in MetaMask.

---

This project was developed for COMP4541.
