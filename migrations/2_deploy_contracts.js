const YieldOfferings = artifacts.require('YieldOfferings');

module.exports = async function (deployer,network, accounts) {



await deployer.deploy(YieldOfferings );
const yieldOfferings = await YieldOfferings.deployed()
};


