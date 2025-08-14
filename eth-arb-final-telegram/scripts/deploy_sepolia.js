const hre = require('hardhat');
require('dotenv').config();
async function main() {
  const provider = process.env.AAVE_ADDRESS_PROVIDER_SEPOLIA || '0x0000000000000000000000000000000000000000';
  const FlashArb = await hre.ethers.getContractFactory('FlashArbV3');
  const f = await FlashArb.deploy(provider);
  await f.deployed();
  console.log('FlashArbV3 deployed to', f.address);
  console.log('Add to .env as FLASHARB_ADDRESS_SEPOLIA');
}
main().catch(e=>{console.error(e); process.exit(1)});
