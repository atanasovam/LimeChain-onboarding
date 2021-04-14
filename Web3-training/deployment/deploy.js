const etherlime = require('etherlime-lib');
const USElection = require('../build/USElection.json');

const deploy = async (network, secret, etherscanApiKey) => {

	const deployer = new etherlime.EtherlimeGanacheDeployer();
	await deployer.deploy(USElection);
};

module.exports = {
	deploy
};