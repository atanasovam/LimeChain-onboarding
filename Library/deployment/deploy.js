const etherlime = require('etherlime-lib');
const dotenv = require('dotenv');

const LIB = require('../build/LIB.json');
const LIBWrapper = require('../build/LIBWrapper.json');
const Library = require('../build/Library.json');

const deploy = async (network, secret, etherscanApiKey) => {
    dotenv.config();

    const deployer = new etherlime.EtherlimeGanacheDeployer(process.env.PRIVATE_KEY_LOCAL, 8545);
    // const result = await deployer.deploy(LIB); // 0x73913a0EaD80E32703801242d4C63941523E9cB6
    //const result = await deployer.deploy(LIBWrapper, {}, lib address); // 0x3B56B621acDd61B4E1c51e138c6974709DCf7dC3
    const result = await deployer.deploy(Library, {}, "0x73913a0EaD80E32703801242d4C63941523E9cB6", "0x3B56B621acDd61B4E1c51e138c6974709DCf7dC3"); // 0xE56077db1fa026E08804f23609B156832BeA8De6 
};

module.exports = { deploy };