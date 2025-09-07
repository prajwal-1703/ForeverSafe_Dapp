import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  http,
  createConfig,
  WagmiProvider,
  useConnect,
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import "./App.css";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contractConfig";

const queryClient = new QueryClient();

// Wagmi configuration
export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <h1>Inheritance DApp</h1>
          <p>Create a will, set an heir, and manage inheritance on Ethereum Sepolia.</p>
          <WalletConnector />
          <MyAddress />
          <ContractInfo />
          <MakeWill />
          <DepositFunds />
          <PingOwner />
          <ClaimFunds />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Wallet connect component
function WalletConnector() {
  const { connectors, connect } = useConnect();
  return (
    <div className="wallet-connector">
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
}

// Display connected wallet address
function MyAddress() {
  const { address, isConnected } = useAccount();
  if (!isConnected) return <p>Not connected</p>;
  return <p>Connected as: <strong>{address}</strong></p>;
}

// Display contract info
function ContractInfo() {
  const { data: lastVisited } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "lastVisited",
  });

  const { data: duration } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "duration",
  });

  const { data: recipient } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "recipient",
  });

  const displayRecipient =
    recipient && recipient !== "0x0000000000000000000000000000000000000000"
      ? recipient
      : "Not set";

  return (
    <div className="contract-info">
      <p>
        <strong>Last Visited:</strong>{" "}
        {lastVisited ? new Date(Number(lastVisited) * 1000).toLocaleString() : "N/A"}
      </p>
      <p>
        <strong>Duration:</strong> {duration ? `${duration} seconds` : "N/A"}
      </p>
      <p>
        <strong>Recipient:</strong> {displayRecipient}
      </p>
    </div>
  );
}

// Create or update will
function MakeWill() {
  const { writeContract } = useWriteContract();
  const [recipient, setRecipient] = useState("");
  const [duration, setDuration] = useState("");

  const handleMakeWill = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "setWill",
        args: [recipient, BigInt(duration)],
      });
      alert("Will created successfully!");
    } catch (err) {
      alert("Error: " + (err?.message || err));
    }
  };

  return (
    <div className="make-will">
      <h3>Create/Update Will</h3>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={handleMakeWill}>Set Will</button>
    </div>
  );
}

// Deposit ETH to contract
function DepositFunds() {
  const { writeContract } = useWriteContract();

  const handleDeposit = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "deposit",
        value: BigInt(1000000000000000), // 0.001 ETH
      });
      alert("Deposit successful!");
    } catch (err) {
      alert("Error: " + (err?.message || err));
    }
  };

  return (
    <div className="deposit">
      <button onClick={handleDeposit}>Deposit 0.001 ETH</button>
    </div>
  );
}

// Ping owner to reset inactivity
function PingOwner() {
  const { writeContract } = useWriteContract();

  const handlePing = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "ping",
      });
      alert("Ping successful!");
    } catch (err) {
      alert("Error: " + (err?.message || err));
    }
  };

  return (
    <div className="ping">
      <button onClick={handlePing}>Ping (Keep Alive)</button>
    </div>
  );
}

// Claim inheritance funds
function ClaimFunds() {
  const { writeContract } = useWriteContract();

  const handleClaim = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "claim",
      });
      alert("Claim successful!");
    } catch (err) {
      alert("Error: " + (err?.message || err));
    }
  };

  return (
    <div className="claim">
      <button onClick={handleClaim}>Claim Inheritance</button>
    </div>
  );
}

export default App;
