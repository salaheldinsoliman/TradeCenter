const { time } = require("@openzeppelin/test-helpers");
const { assert } = require("chai");
const YieldOfferings = artifacts.require('YieldOfferings.sol')

contract("YieldOfferings", function (accounts) {
    const [owner, secondAccount] = accounts;
    /** create an instance of the contract to use its functions before each test */
    before(async () => {
      yieldOfferings = await YieldOfferings.new();
    });

    it('should deploy correctly', async () => {
        const yieldOfferings = await YieldOfferings.new();
        console.log(yieldOfferings.address);
        assert(yieldOfferings.address != '');
    });

    it ('should add a offering', async ()=> {


let getDay = await yieldOfferings.getDayFromTimeStamp()
console.log(getDay.toNumber())

signIn = await yieldOfferings.SignInIssuer()
//let event = await yieldOfferings.events.getIssuer()
//console.log(event)
//console.log("a7a",signIn.toString())


      console.log(accounts[0])
//function addOfferingList(string memory _name,uint[] memory input, string memory fixing_duration)

      let result = await yieldOfferings.addOfferingList("offerig1", [3,3,3,3,3,3],"weekly" );
      let result2 = await yieldOfferings.addOfferingList("offerig2", [3,3,3,3,3,3],"daily" );

      let offeringsarray = await yieldOfferings.getOfferings();
      console.log (offeringsarray)

    //  console.log(yieldOfferings.IDList[0], "test");
    //yieldOfferings.events.logAddedOffering();

      /*count= await charity.retcount()
      assert.equal(count.toNumber(), 0)
      /*const event = result.logs[0].args
      assert.equal(event.id.toNumber()+1, count.toNumber, 'id correct' )
      -
      charity.events.logAddedCampaign();
     const result = charity.returnID(0);
     */ 
    
     //yieldOfferings.events.logAddedOffering();


let buy = await yieldOfferings.buyOffering(1, {from : accounts[1], value : 1000000});
let buy2 = await yieldOfferings.buyOffering(1, {from : accounts[2], value : 1000000});
console.log("==============================================================")
let getContracts = await yieldOfferings.getAllContracts();
console.log(getContracts)
console.log("==============================================================")

let depositToWallet = await yieldOfferings.depositToWallet ({from : accounts[0],value:500000000})


console.log("============================")
let bal = await yieldOfferings.getContractETH ();
console. log ("ether in contract before:",bal.toNumber() )

let balweth = await yieldOfferings.getWETHBalance()
console.log("WETH in contract Before:",balweth.toString())


let usdtBal = await yieldOfferings.getUSDTBalance()
console.log("USDT in contract Before:",usdtBal.toString())





let exchange = await yieldOfferings.swapETHFromBuiltInWallet( 1050000, {from :accounts[0] })




let bal2 = await yieldOfferings.getContractETH ();
console. log ("ether in contract after:",bal2.toNumber() )

let balweth2 = await yieldOfferings.getWETHBalance()
console.log("WETH AFTER:",balweth2.toString())


let usdtBal2 = await yieldOfferings.getUSDTBalance()
console.log("USDT in contract after:",usdtBal2.toString())



//console.log(buy.toString())
//await yieldOfferings.events.getContract();


    });

});
