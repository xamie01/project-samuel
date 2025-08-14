require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: '0.8.17',
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || '',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    hardhat: {
      forking: {
        url: process.env.MAINNET_RPC_URL || ''
      }
    }
  }
};
