const etherlime = require('etherlime-lib');
const Library = require('../build/Library.json');
const dotenv = require('dotenv');

const deploy = async (network, secret, etherscanApiKey) => {
    dotenv.config();
    
    const deployer = new etherlime.EtherlimeGanacheDeployer(process.env.PRIVATE_KEY_LOCAL, 8545);
    const result = await deployer.deploy(Library, {}, 'Here is Address', '0x90f5b5EB9fd37306A78d5ef28123ef5dd9136E96');
};

module.exports = { deploy };