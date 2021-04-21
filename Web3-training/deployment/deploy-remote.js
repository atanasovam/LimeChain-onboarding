const etherlime = require('etherlime-lib');
const USElection = require('../build/USElection.json');

const deploy = async (network, secret, etherscanApiKey) => {
    const defaultOverrides = {
        gas: 4500000,
        gasPrice: 29999999999,
    };

	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, '40c2813049e44ec79cb4d7e0d18de173', defaultOverrides);
	await deployer.deploy(USElection);
};

module.exports = {
	deploy
};