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

    //await deployer.deploy(LIB); // 0x4C5EB1291EE7982F5562aBA87Dc459f5e76EfdED
    //await deployer.deploy(LIBWrapper, {}, ""); // 0x0FFf08190DF3E607E116869Fca8cC0faD7b0835a
    await deployer.deploy(Library, {}, "0x4C5EB1291EE7982F5562aBA87Dc459f5e76EfdED", "0x0FFf08190DF3E607E116869Fca8cC0faD7b0835a"); // 0xd7Fc0B47D9862efBEe0019946Fa6ac830B4c92Fd

}

module.exports = { deploy };