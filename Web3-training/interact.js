const { ethers } = require("ethers");
const USElection = require('./build/USelection.json');

const run = async function() {
	const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
	const latestBlock = await provider.getBlock("latest");
	console.log(latestBlock.hash);

    const wallet = new ethers.Wallet("0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8", provider);
	const balance = await wallet.getBalance();
    console.log(ethers.utils.formatEther(balance, 18));

    const electionContract = new ethers.Contract("0xc9707E1e496C12f1Fa83AFbbA8735DA697cdBf64", USElection.abi, wallet);
	console.log(electionContract);

	const hasEnded = await electionContract.electionEnded();
	console.log("The election has ended:", hasEnded);

	const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio");
	console.log("Have results for Ohio:", haveResultsForOhio);

	const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
	const transactionReceipt = await transactionOhio.wait();

	if (transactionReceipt.status != 1) { // 1 means success
		console.log("Transaction was not successfull")
		return 
	}

	const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio");
	console.log("Results submitted for Ohio", resultsSubmittedOhioNew);

	const currentLeader = await electionContract.currentLeader();
	console.log("Current leader", currentLeader);
};

run();