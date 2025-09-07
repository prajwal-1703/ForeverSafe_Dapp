# ForeverSafe

ForeverSafe is a decentralized inheritance management DApp built on **Ethereum Sepolia Testnet**. The platform allows users to create a will, set a recipient, deposit funds, and manage inheritance securely via smart contracts.

---

## 🛠️ Features

- **Create/Update Will:** Owners can set a recipient and inactivity duration.
- **Deposit Funds:** ETH can be securely deposited into the contract.
- **Ping (Keep Alive):** Owner can ping to prove activity and reset inactivity timer.
- **Claim Funds:** Recipient can claim inheritance if owner is inactive for the specified duration.
- **Wallet Integration:** Supports MetaMask for seamless Web3 interaction.

---

## 📜 Smart Contract

**Contract Name:** `Inheritance`  
**Solidity Version:** `^0.8.0`  
**Functions:**

1. **setWill(address _recipient, uint _duration)** – Owner sets/updates recipient and inactivity duration.
2. **deposit() payable** – Owner deposits ETH into the contract.
3. **ping()** – Owner proves activity to reset lastVisited timestamp.
4. **claim()** – Recipient claims the funds after owner inactivity.

**Modifiers:**

- `onlyOwner` – Restricts certain functions to contract owner.
- `onlyRecipient` – Restricts certain functions to recipient.

---

## ⚡ Frontend

**Stack:**

- React
- Wagmi (Web3 React hooks)
- @tanstack/react-query
- Ethereum Sepolia Testnet
- TailwindCSS (or custom CSS)
- Responsive and interactive UI

**Key Components:**

- WalletConnector
- MyAddress
- ContractInfo
- MakeWill
- DepositFunds
- PingOwner
- ClaimFunds

**Main Functionalities in Frontend:**

- Connect wallet via MetaMask
- Display contract details: last visited, recipient, and duration
- Allow setting/updating will
- Deposit ETH
- Ping owner to reset inactivity
- Claim inheritance

---

## 📁 Project Structure

```

ForeverSafe/
│
├─ scripts/
│   ├─ deploy.cjs          # Deployment script for Hardhat
│
├─ src/
│   ├─ App.jsx             # React frontend main component
│   ├─ App.css             # Styling for the app
│   ├─ contractConfig.js   # Contract address and ABI
│
├─ contracts/
│   ├─ Inheritance.sol     # Smart contract
│
├─ hardhat.config.cjs      # Hardhat configuration
├─ package.json
├─ .env                    # Environment variables (ignored in git)
├─ README.md

````

---

## 🚀 Deployment

### Prerequisites

- Node.js v22
- NPM or PNPM
- Hardhat
- MetaMask (for frontend interaction)
- Sepolia testnet ETH

### Steps

1. **Install dependencies:**

```bash
npm install
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
npm install @tanstack/react-query
````

2. **Compile the contract:**

```bash
npx hardhat compile
```

3. **Deploy the contract:**

```bash
npx hardhat run scripts/deploy.cjs --network sepolia
```

4. **Configure frontend:**

* Update `contractConfig.js` with deployed contract address and ABI.

5. **Run frontend:**

```bash
npm start
```

* Open [http://localhost:3000](http://localhost:3000) to use the DApp.

---

## ⚙️ Environment Variables

Create a `.env` file in the root folder with your sensitive keys:

```
INFURA_API_KEY=your_infura_key
PRIVATE_KEY=your_wallet_private_key
```

> **Important:** Ensure `.env` is listed in `.gitignore` to avoid pushing secrets to GitHub.

---

## 💻 Commands History

The following commands were used during setup and deployment:

```bash
sudo apt update
sudo apt upgrade
nvm install 22
nvm use 22
npm install
npm install --save-dev hardhat@^2.22.5 @nomicfoundation/hardhat-toolbox dotenv
npm install @tanstack/react-query
npx hardhat compile
npx hardhat run scripts/deploy.cjs --network sepolia
```

---

## 🖌️ Styling

* **App.css** includes professional, animated, and interactive UI elements for wallet connection, form input, and buttons.
* Fully responsive for desktop and mobile.

---

## 🔗 Useful Links

* [Ethereum Sepolia Faucet](https://sepoliafaucet.com/)
* [Hardhat Documentation](https://hardhat.org/getting-started/)
* [Wagmi Documentation](https://wagmi.sh/)
* [React Query Documentation](https://tanstack.com/query/latest)

---

## 🧑‍💻 Author

* Project Name: **ForeverSafe**
* Developer: Prajwal (You can add your GitHub link here)
* Blockchain Mentor: Ganesh Deshpande (if applicable)

---

## ⚠️ Notes

* Make sure to have Sepolia ETH for testing.
* Do **not push `.env`** file to GitHub; secrets must remain private.
* Test all functions carefully before moving to a live environment.

---

## 📄 License

This project is licensed under the **MIT License**.

