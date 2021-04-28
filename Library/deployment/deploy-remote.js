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

    //await deployer.deploy(LIB); // 0x555b397199d7aFe904bd839fC6f01E8d24FAdD84
    // await deployer.deploy(LIBWrapper, {}, ""); // 0xA07D71d09a0339E1BeD9FcdeF6FD80f84E9dF342
    await deployer.deploy(Library, {}, "", ""); // 

}

module.exports = { deploy };