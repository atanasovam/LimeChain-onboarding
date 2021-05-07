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

    //await deployer.deploy(LIBWrapper);
    await deployer.deploy(Library, {}, "0x96E7DE0583356A2d740d5a8966CD99CAEc1e98Cc", "0xAA357D41Af3d951ea1c47EA3a1cce164826A583d");
}

module.exports = { deploy };