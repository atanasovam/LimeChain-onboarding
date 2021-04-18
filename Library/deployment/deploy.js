const etherlime = require('etherlime-lib');
const Library = require('../build/Library.json');
const { run } = require('../interact.js');

const deploy = async (network, secret, etherscanApiKey) => {
    const deployer = new etherlime.EtherlimeGanacheDeployer();
    const { contract } = await deployer.deploy(Library);
    const wallet = deployer.signer.signingKey;

    run(contract, wallet);
};

module.exports = { deploy };