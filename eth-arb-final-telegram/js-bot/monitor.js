const { ethers } = require('ethers');
const cfg = require('./config');
const { estimateTwoDex } = require('./simulate');
const { sendFlashloan } = require('./executor');
const fetch = require('node-fetch');
let lastScan = null;
async function runMonitorOnce(mode) {
  const providerUrl = mode==='mainnet' ? cfg.MAINNET_RPC : cfg.SEPOLIA_RPC;
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const routers = mode==='mainnet' ? cfg.ROUTERS_MAINNET : cfg.ROUTERS_SEPOLIA;
  const weth = mode==='mainnet' ? cfg.WETH_MAINNET : cfg.WETH_SEPOLIA;
  const dai = mode==='mainnet' ? cfg.DAI_MAINNET : cfg.DAI_SEPOLIA;
  if (!routers || routers.length<2) { console.log('not enough routers configured'); return; }
  const amountIn = ethers.utils.parseEther('1');
  const est = await estimateTwoDex(provider, routers[0], routers[1], amountIn, weth, dai);
  lastScan = Date.now();
  console.log('estimate', est);
  if (est && est.profitable) {
    const text = `Arb found on ${mode}: profit ${est.profit} ETH (~${est.profitPercent}%)`;
    console.log(text);
    if (cfg.TG_BOT_TOKEN && cfg.TG_CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${cfg.TG_BOT_TOKEN}/sendMessage`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ chat_id: cfg.TG_CHAT_ID, text }) });
    }
    if (cfg.AUTO_EXECUTE) {
      const flasharb = mode==='mainnet' ? cfg.FLASHARB_MAINNET : cfg.FLASHARB_SEPOLIA;
      if (!flasharb) { console.log('flasharb address not set'); return; }
      const routersList = [routers[0], routers[1]];
      const paths = [[weth,dai],[dai,weth]];
      const res = await sendFlashloan(mode, flasharb, routersList, paths, amountIn);
      console.log('execution result', res);
      if (cfg.TG_BOT_TOKEN && cfg.TG_CHAT_ID) {
        await fetch(`https://api.telegram.org/bot${cfg.TG_BOT_TOKEN}/sendMessage`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ chat_id: cfg.TG_CHAT_ID, text: 'Execution result: '+JSON.stringify(res) }) });
      }
    }
  }
}
if (require.main === module) {
  const mode = cfg.MODE === 'mainnet' ? 'mainnet' : 'sepolia';
  setInterval(()=>{ runMonitorOnce(mode).catch(e=>console.error(e)); }, cfg.POLL_INTERVAL*1000);
}
module.exports = { runMonitorOnce };
