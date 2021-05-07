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
    await deployer.deploy(Library, {}, "0x9d704E9853E7622FA3606625d494F768BEC3b291", "0xCED6eDC9bcAb393edBfE66CC54d49a844A1e6779"); // 
}

module.exports = { deploy };