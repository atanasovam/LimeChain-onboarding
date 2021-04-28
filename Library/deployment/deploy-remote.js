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
    
    // wrapper 0x203844cee575Dcc322EA76F4b90913CeB13DdDB3
    // token 0xf56fC6c608c193481754805975b8c0E92DA4B1Ae

    await deployer.deploy(Library, {}, "0xf56fC6c608c193481754805975b8c0E92DA4B1Ae", "0x203844cee575Dcc322EA76F4b90913CeB13DdDB3"); // 
}

module.exports = { deploy };