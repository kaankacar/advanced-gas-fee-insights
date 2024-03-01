const { getGasUsedByAddress } = require('gas-fee-tracker-by-kaan');
const { plotGasUsage } = require('./visualization');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const main = async () => {
  readline.question('Please enter your wallet address: ', async (address) => {
    console.log(`Fetching gas usage data for: ${address}`);
    await getGasUsedByAddress(address);

    console.log(`Generating gas usage visualization for: ${address}`);
    await plotGasUsage(address);

    readline.close();
  });
};

main().catch(console.error);
