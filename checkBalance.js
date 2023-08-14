const { Web3 } = require('web3'); 
const bip39 = require('bip39');

 //Connect to the Binance Smart Chain using a provider
 const providerUrl = 'https://bsc-dataseed.bnbchain.org/'; // Updated URL
 const web3 = new Web3(providerUrl);

  //Define an array of token contract addresses and their corresponding ABIs
 const tokenContracts = [
   {
     address: '0x1d1A319Faed34C22926530Dd5b4c1Bf65460E25D',  //Replace with the actual token contract address
     abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}],  //Replace with the ABI of the token contract
   },
   {
     address: '0x15c4ABeCd961D5e585e4A608a9CD9f436cD9E592',  //Replace with another token contract address
     abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}],  //Replace with the ABI of the token contract
   },
    //Add more token contracts as needed
 ];

const generatedPhrases = []; // This array will hold the generated mnemonic phrases

// Generate mnemonic phrases
const sixtyWordPhrase="often discover energy cliff chronic better desk tray wild discover nothing suggest dirt trade scheme core live pair film game silver organ bubble mango equal fact impact certain cube decade minute romance Industry finger miracle hollow media cousin cigar hollow domain crew spell truth toddler rural school spare dizzy lazy tube trumpet consider tired toddler venture isolate culture meadow false";

const words = sixtyWordPhrase.split(' ');
const phrases = [];

const startTime = new Date().getTime();
const maxTime = 8 * 60 * 1000;

while (phrases.length < 5 && new Date().getTime() - startTime < maxTime) {
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
   
    const twelveWordPhrase = words.slice(0, 12).join(' ');
   
    if (bip39.validateMnemonic(twelveWordPhrase)) {
        const seed = bip39.mnemonicToSeedSync(twelveWordPhrase);
        const hdWallet = bip39.generateMnemonic(256, null, bip39.wordlists.EN, seed); // Specify the wordlist
        phrases.push(hdWallet);
    }
}

  //Check token balances
  async function checkTokenBalances() {
    console.log('checkTokenBalances() function is being executed.');
    for (let i = 0; i < tokenContracts.length; i++) {
      const tokenContract = new web3.eth.Contract(tokenContracts[i].abi, tokenContracts[i].address);
      console.log(`Checking balances for token contract: ${tokenContracts[i].address}`);
  
      for (let j = 0; j < generatedPhrases.length; j++) {
        const wallet = web3.eth.accounts.wallet.create(0, generatedPhrases[j]);
        const walletAddress = wallet.address;
        console.log(`Checking balance for address: ${walletAddress}`);
  
        const balance = await tokenContract.methods.balanceOf(walletAddress).call();
        console.log(`Balance: ${balance}`);
  
        if (balance > 0) {
          console.log(`Token Contract Address: ${tokenContracts[i].address}`);
          console.log(`Mnemonic Phrase: ${generatedPhrases[j]}`);
          console.log(`Token Balance: ${balance}`);
          console.log('-----------------------------');
          // Add your desired output or further processing here
        }
      }
    }
  }
  checkTokenBalances();  
