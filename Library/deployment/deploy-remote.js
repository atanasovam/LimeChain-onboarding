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
    
    // wrapper 0x7422f08664DD029151CC8EAB2E730241EB69D7Fd
    // token 0x76874024274f06fc86938d80C891b6d8c3294073
    // await deployer.deploy(LIBWrapper);
    await deployer.deploy(Library, {}, "0xA9dE8e1DC747f12BD623631Cdc93ff64E00E9434", "0x7422f08664DD029151CC8EAB2E730241EB69D7Fd"); // 0x044176552c61930C7c1908859142C44c2aD11a48
}

module.exports = { deploy };