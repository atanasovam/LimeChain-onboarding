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
    
    // wrapper 0x6dCF49361cC1415C7072A0440a7fc0f562f59540
    // token 0x5f2191D156Fd9A7a93b1597A3113b68987df7884
    // await deployer.deploy(LIBWrapper);
    await deployer.deploy(Library, {}, "0x5f2191D156Fd9A7a93b1597A3113b68987df7884", "0x6dCF49361cC1415C7072A0440a7fc0f562f59540"); // 0x33E0b75F929E156Bac4Aaa0C3F63ea3e43FC6FFF
}

module.exports = { deploy };