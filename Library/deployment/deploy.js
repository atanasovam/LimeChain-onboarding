const etherlime = require('etherlime-lib');
const Library = require('../build/Library.json');
const dotenv = require('dotenv');

const deploy = async (network, secret, etherscanApiKey) => {
    dotenv.config();
    
    const deployer = new etherlime.EtherlimeGanacheDeployer(process.env.PRIVATE_KEY_LOCAL, 8545);
    await deployer.deploy(Library);
};

module.exports = { deploy };