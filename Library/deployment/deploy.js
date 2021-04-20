const etherlime = require('etherlime-lib');
const Library = require('../build/Library.json');
const { PRIVATE_KEY } = require('../constants/address');

const deploy = async (network, secret, etherscanApiKey) => {
    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000,
        chainId: 0
    }

    const deployer = new etherlime.EtherlimeGanacheDeployer(PRIVATE_KEY, 8545, defaultConfigs);
    await deployer.deploy(Library);
};

module.exports = { deploy };