const hre = require("hardhat");

async function main() {
  // Get contract factory
  const Inheritance = await hre.ethers.getContractFactory("Inheritance");

  // Deploy contract
  const inheritance = await Inheritance.deploy(); // no args needed

  // Wait for deployment transaction to be mined
  await inheritance.waitForDeployment();

  console.log("Inheritance deployed to:", await inheritance.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
