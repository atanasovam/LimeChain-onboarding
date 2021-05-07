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
    await deployer.deploy(Library, {}, "0xBdecdC5ce015ad0C2C8deA648C6B8C656139d5d5", "0xBfC94C3625D9939F42A010aeB43d7B52423a28a7"); // 
}

module.exports = { deploy };