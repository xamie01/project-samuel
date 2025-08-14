# ETH Arbitrage Bot — Final (Sepolia default) with Telegram control

This package is an end-to-end scaffold. Key features:
- Aave v3 flashloan receiver contract (contracts/FlashArbV3.sol)
- Hardhat deploy script for Sepolia
- Node.js bot (js-bot/) with monitoring, simulation, multicall support, executor, and Telegram control
- Telegram commands: /start, /status, /setmode <mainnet|sepolia>, /auto <on|off>, /demo

## Quick start
1. Copy `.env.example` → `.env` and fill keys (SEPOLIA_RPC_URL, PRIVATE_KEY, TG_BOT_TOKEN, TG_CHAT_ID). Keep key secret.
2. Install npm packages:
```bash
npm install
```
3. Compile and deploy to Sepolia (optional):
```bash
npx hardhat compile
npx hardhat run scripts/deploy_sepolia.js --network sepolia
```
4. Add deployed contract address to `.env` as FLASHARB_ADDRESS_SEPOLIA.
5. Run demo (single pass):
```bash
npm run demo
```
6. Start monitor (continuous):
```bash
npm run monitor
```
7. Start Telegram controller (separate terminal):
```bash
npm run start-telegram
```

## Safety
- `DRY_RUN=true` prevents real txs; keep it on while testing.
- Always test on Sepolia or Hardhat fork before mainnet.

Enjoy. This is a scaffold; audit and improve before live use.
