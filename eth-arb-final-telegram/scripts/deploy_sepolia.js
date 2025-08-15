  GNU nano 7.2                                                                                     deploy_sepolia.js                                                                                               
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("Starting Sepolia deployment debug...");

  const deployer = (await hre.ethers.getSigners())[0];
  console.log("Deployer address:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", hre.ethers.utils.formatEther(balance), "ETH");

  const providerAddress =
    process.env.AAVE_ADDRESS_PROVIDER_SEPOLIA ||
    "0x0000000000000000000000000000000000000000";

  console.log("Using AAVE address provider:", providerAddress);

  const FlashArb = await hre.ethers.getContractFactory("FlashArbV3");
  const f = await FlashArb.deploy(providerAddress);

  await f.deployed();

  console.log("FlashArbV3 deployed to:", f.address);
  console.log("Add to .env as FLASHARB_ADDRESS_SEPOLIA");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



