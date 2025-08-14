const { ethers } = require('ethers');
const cfg = require('./config');
const AAVE_FEE_BPS = 5;
async function estimateTwoDex(provider, routerA, routerB, amountIn, weth, dai) {
  const ABI = ["function getAmountsOut(uint256,address[]) view returns (uint256[])"];
  const rA = new ethers.Contract(routerA, ABI, provider);
  const rB = new ethers.Contract(routerB, ABI, provider);
  try {
    const outA = (await rA.getAmountsOut(amountIn, [weth,dai]))[1];
    const outB = (await rB.getAmountsOut(outA, [dai,weth]))[1];
    const fee = amountIn.mul(AAVE_FEE_BPS).div(10000);
    const gasPrice = await provider.getGasPrice();
    const estimatedGas = ethers.BigNumber.from('400000');
    const gasCost = gasPrice.mul(estimatedGas);
    const profit = outB.sub(amountIn).sub(fee).sub(gasCost);
    const profitPercent = profit.gt(0) ? profit.mul(10000).div(amountIn).toNumber()/100 : -1;
    return { amountIn: ethers.utils.formatEther(amountIn), outA: ethers.utils.formatEther(outA), outB: ethers.utils.formatEther(outB), fee: ethers.utils.formatEther(fee), gasEth: ethers.utils.formatEther(gasCost), profit: profit.gt(0)?ethers.utils.formatEther(profit):'0', profitPercent, profitable: profit.gt(0) && profitPercent >= cfg.PROFIT_THRESHOLD };
  } catch (e) {
    return null;
  }
}
module.exports = { estimateTwoDex };
