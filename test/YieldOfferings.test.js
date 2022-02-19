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
      console.log(accounts[0])
      result = await yieldOfferings.addOffering("offerig1", 3,3,3,3,3,3);
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
    result2 = await yieldOfferings.getCount();
     assert.equal(result2.toNumber(),1);
     console.log (result2.toNumber())
     //yieldOfferings.events.logAddedOffering();


let buy = await yieldOfferings.buyOffering(1, {from : accounts[1], value : 1000000});
//console.log(buy.toString())
yieldOfferings.events.getContract();


    });

});
