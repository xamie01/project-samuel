require('dotenv').config();
const cfg = {
  MAINNET_RPC: process.env.MAINNET_RPC_URL,
  SEPOLIA_RPC: process.env.SEPOLIA_RPC_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  ROUTERS_MAINNET: [process.env.UNISWAP_ROUTER_MAINNET, process.env.SUSHISWAP_ROUTER_MAINNET].filter(Boolean),
  ROUTERS_SEPOLIA: [process.env.UNISWAP_ROUTER_SEPOLIA, process.env.SUSHISWAP_ROUTER_SEPOLIA].filter(Boolean),
  WETH_MAINNET: process.env.WETH_MAINNET,
  DAI_MAINNET: process.env.DAI_MAINNET,
  WETH_SEPOLIA: process.env.WETH_SEPOLIA,
  DAI_SEPOLIA: process.env.DAI_SEPOLIA,
  FLASHARB_SEPOLIA: process.env.FLASHARB_ADDRESS_SEPOLIA,
  FLASHARB_MAINNET: process.env.FLASHARB_ADDRESS_MAINNET,
  MULTICALL_MAINNET: process.env.MULTICALL_ADDRESS_MAINNET,
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN,
  TG_CHAT_ID: process.env.TG_CHAT_ID,
  PROFIT_THRESHOLD: Number(process.env.PROFIT_THRESHOLD_PERCENT || 10),
  POLL_INTERVAL: Number(process.env.POLL_INTERVAL_SECONDS || 7),
  AUTO_EXECUTE: (process.env.AUTO_EXECUTE || 'true') === 'true',
  USE_FLASHBOTS: (process.env.USE_FLASHBOTS || 'false') === 'true',
  DRY_RUN: (process.env.DRY_RUN || 'true') === 'true',
  MODE: (process.env.START_MODE || 'sepolia')
};
module.exports = cfg;
