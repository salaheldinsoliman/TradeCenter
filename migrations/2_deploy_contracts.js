//const GasTesting = artifacts.require('GasTesting');

const YieldOfferings = artifacts.require('YieldOfferings');
const TradeCenter =artifacts.require('TradeCenter');
module.exports = async function (deployer,network, accounts) {


    //await deployer.deploy(TradeCenter);
    await deployer.deploy(YieldOfferings );
    //await deployer.deploy(TradeCenter );

//const tradeCenter = await TradeCenter.deployed();
//const YieldOfferings = await YieldOfferings.deployed();

};


    


