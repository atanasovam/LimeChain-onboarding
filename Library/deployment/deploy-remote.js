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
    
    // wrapper 0x601A30e7b7159ab2b9fAF5917fDfb8aee5ee154A
    // token 
    //await deployer.deploy(LIBWrapper);
    await deployer.deploy(Library, {}, "0x721b522254956e4146416aDfB864E04b3B1290EE", "0x601A30e7b7159ab2b9fAF5917fDfb8aee5ee154A"); // 0xE513b4b65F98BcAb4cc54AADcfFfAE38b1e0e345
}

module.exports = { deploy };