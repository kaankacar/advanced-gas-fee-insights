const axios = require('axios');
require('dotenv').config(); // Ensure dotenv is set up in your package

// Function to fetch transactions from Etherscan
const fetchTransactions = async (address) => {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return [];
  }
};

const plotGasUsage = async (address) => {
  const transactions = await fetchTransactions(address);

  if (transactions && transactions.length > 0) {
    console.log(`Gas used by transactions for address ${address}:`);
    transactions.forEach(transaction => {
      console.log(`TxHash: ${transaction.hash}, Gas Used: ${transaction.gasUsed}`);
    });
  } else {
    console.log('No transactions found or failed to fetch transactions.');
  }
};

module.exports = { plotGasUsage };
