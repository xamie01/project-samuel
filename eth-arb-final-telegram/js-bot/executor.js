const { ethers } = require('ethers');
const cfg = require('./config');
const abi = ["function startFlashLoan(address asset, uint256 amount, bytes params) external"];
async function buildParams(routers, paths, minOuts) {
  const coder = ethers.utils.defaultAbiCoder;
  return coder.encode(["address[]","address[][]","uint256[]"],[routers, paths, minOuts]);
}
async function sendFlashloan(network, flasharbAddress, routers, paths, amount) {
  const rpc = network === 'mainnet' ? cfg.MAINNET_RPC : cfg.SEPOLIA_RPC;
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(cfg.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(flasharbAddress, abi, wallet);
  const minOuts = paths.map(p => 0);
  const params = await buildParams(routers, paths, minOuts);
  const txData = await contract.populateTransaction.startFlashLoan(paths[0][0], amount, params);
  if (cfg.DRY_RUN) { console.log('DRY RUN - tx prepared. data:', txData.data); return { dry: true, data: txData.data }; }
  if (cfg.USE_FLASHBOTS && network==='mainnet') {
    const { FlashbotsBundleProvider } = require('@flashbots/ethers-provider-bundle');
    const auth = ethers.Wallet.createRandom();
    const fb = await FlashbotsBundleProvider.create(provider, auth);
    const signedTx = await wallet.signTransaction({ to: flasharbAddress, data: txData.data, gasLimit: 5000000 });
    const block = await provider.getBlockNumber();
    const bundle = await fb.sendBundle([{ signedTransaction: signedTx }], block+1);
    const wait = await bundle.wait();
    console.log('Flashbots result', wait);
    return { flashbots: true, result: wait };
  }
  const tx = await wallet.sendTransaction({ to: flasharbAddress, data: txData.data, gasLimit: 5000000 });
  console.log('tx sent', tx.hash);
  const rc = await tx.wait();
  console.log('tx mined', rc.transactionHash);
  return { txHash: rc.transactionHash };
}
module.exports = { sendFlashloan };
