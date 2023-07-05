const bip39 = require('bip39');
const Web3 = require('web3');

// Connect to the Ethereum network using a provider
const web3 = new Web3('https://bsc-dataseed.binance.org'); // Update with the appropriate provider URL

// Placeholder values (replace with your actual values)
const tokenContractAddress = '0x123...'; // Replace with the actual token contract address
const tokenAbi = []; // Replace with the ABI of the token contract
const generatedPhrases = ['...', '...', '...']; // Replace with the generated mnemonic phrases

async function checkTokenBalance() {
  const tokenContract = new web3.eth.Contract(tokenAbi, tokenContractAddress);

  for (let i = 0; i < generatedPhrases.length; i++) {
    const wallet = web3.eth.accounts.wallet.create(0, generatedPhrases[i]);
    const walletAddress = wallet.address;

    const balance = await tokenContract.methods.balanceOf(walletAddress).call();
    if (balance > 0) {
      console.log(`Wallet Address: ${walletAddress}`);
      console.log(`Mnemonic Phrase: ${generatedPhrases[i]}`);
      console.log(`Token Balance: ${balance}`);
      console.log('-----------------------------');
      // Add your desired output or further processing here
    }
  }
}

// Run the function to check token balances
checkTokenBalance();
