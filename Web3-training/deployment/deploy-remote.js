const etherlime = require('etherlime-lib');
const USElection = require('../build/USElection.json');

const deploy = async (network, secret, etherscanApiKey) => {
	const defaultConfigs = {
        gasPrice: 99999,
        gasLimit: 800000,
        chainId: 0
    };

	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, '40c2813049e44ec79cb4d7e0d18de173', defaultConfigs);
	await deployer.deploy(USElection);
};

module.exports = {
	deploy
};