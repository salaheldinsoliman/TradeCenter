const TradeCenter = artifacts.require('TradeCenter');

module.exports = async function (deployer,network, accounts) {



await deployer.deploy(TradeCenter );
const tradeCenter = await TradeCenter.deployed()
};


