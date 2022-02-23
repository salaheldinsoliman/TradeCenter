const GasTesting = artifacts.require('GasTesting');

const YieldOfferings = artifacts.require('YieldOfferings');
module.exports = async function (deployer,network, accounts) {


    await deployer.deploy(TradeCenter);
    await deployer.deploy(YieldOfferings );

//const tradeCenter = await TradeCenter.deployed();
//const YieldOfferings = await YieldOfferings.deployed();

};


    


