const GasTesting = artifacts.require('GasTesting');

module.exports = async function (deployer,network, accounts) {



await deployer.deploy(GasTesting );
const gasTesting = await GasTesting.deployed()
};


