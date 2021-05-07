const etherlime = require('etherlime-lib');

const LIB = require('../build/LIB.json');
const LIBWrapper = require('../build/LIBWrapper.json');
const Library = require('../build/Library.json');

const deploy = async (network, secret, etherscanApiKey) => {
    const defaultConfigs = {
        gasPrice: 20000000000,
        gasLimit: 4700000,
        chainId: 0
    };

    const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, '40c2813049e44ec79cb4d7e0d18de173', defaultConfigs);

    // await deployer.deploy(LIBWrapper);
    await deployer.deploy(Library, {}, "0xe4c28dd87c464c15c0BD961cbb626034F57dAdd0", "0xa254E4C169D60Aa31B4E5FD55D198b6FCd869578"); // 
}

module.exports = { deploy };