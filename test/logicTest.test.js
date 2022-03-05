const { time } = require("@openzeppelin/test-helpers");
const { assert } = require("chai");
const YieldOfferings = artifacts.require('YieldOfferings.sol')

contract("YieldOfferings", function (accounts) {
    const [owner, secondAccount] = accounts;
    /** create an instance of the contract to use its functions before each test */
    before(async () => {
      yieldOfferings = await YieldOfferings.new();
    });

    it ('should add a offering', async ()=> {


let getDay = await yieldOfferings.getDayFromTimeStamp()
console.log(getDay.toNumber())

signIn = await yieldOfferings.SignInIssuer()
      let result = await yieldOfferings.addOfferingList("offerig1", [3,3,3,3,3,3],"daily" );

      let offeringsarray = await yieldOfferings.getOfferings();
      console.log (offeringsarray)

let buy = await yieldOfferings.buyOffering(1, {from : accounts[1], value : 1000000});

console.log("==============================================================")
let getContracts = await yieldOfferings.getAllContracts();
console.log(getContracts)
console.log("==============================================================")


let count  = await yieldOfferings.getCount()
console.log (count.toNumber())




/*uint _Nb_fixings, 0
    uint _high_coupon,1
    uint _high_coupon_barrier,2
    uint _smaller_coupon,3
    uint _Upoutbarrier,4
    uint _di_barrier, 5*/

let handleFixing = await yieldOfferings.WeeklyofferingsLoader()

console.log(handleFixing)




    });

});
