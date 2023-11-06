# Blockchain-Based Payment System App

This application is a blockchain-based payment system that utilizes smart contracts for handling loyalty points and a frontend interface for user interactions.

## Smart Contract - LoyaltyPoints

The LoyaltyPoints contract is an ERC20 token with custom token issuance and expiration rules. It provides functionalities for issuing tokens to recipients and adjusting the balance of tokens based on their age, implementing a kind of "token demurrage".

### Features:

- **Token Issuance**: Tokens can be issued to any address by calling the `issueTokens` function.
- **Token Balance Adjustment**: The balance function overrides the ERC20 balance to account for aging tokens.
- **Token Expiry**: Tokens reduce by half after 6 months and expire after 1 year.
- **Total Burnt Tokens**: Track the number of tokens that have been burnt over time.

## Frontend Application - wave-app

The frontend is designed to interact with the smart contracts and provide an easy-to-use interface for managing and transferring tokens.

### Technology Stack:

- React for the UI
- Ethers.js for Ethereum blockchain interaction
- Tailwind CSS for styling
- Vite for building and serving the app

### Scripts:

- `dev`: Run the development server
- `build`: Build the app for production
- `serve`: Serve the built app

## Test Suite - test3

A suite of tests to ensure contract functionality works as expected.

### Technologies Used:

- Hardhat for Ethereum development environment
- Chai for assertions
- Waffle for advanced smart contract testing

## Getting Started

To get started with the blockchain-based payment system app, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Compile the smart contracts using `npx hardhat compile`.
4. Run tests using `npx hardhat test`.
5. Start the frontend app in development mode using `npm run dev`.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your proposed changes.
