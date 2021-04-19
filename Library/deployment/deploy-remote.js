const etherlime = require('etherlime-lib');
const Library = require('../build/Library.json');

const deploy = async (network, secret, etherscanApiKey) => {
    const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, '40c2813049e44ec79cb4d7e0d18de173');
    const { contract } = await deployer.deploy(Library);
    const wallet = deployer.signer;
}

module.exports = { deploy };