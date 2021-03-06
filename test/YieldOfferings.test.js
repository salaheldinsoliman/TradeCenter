const { time } = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
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
//let event = await yieldOfferings.events.getIssuer()
//console.log(event)
//console.log("a7a",signIn.toString())


      console.log(accounts[0])
//function addOfferingList(string memory _name,uint[] memory input, string memory fixing_duration)


/*uint _Nb_fixings,
    uint _high_coupon,
    uint _high_coupon_barrier,
    uint _smaller_coupon,
    uint _Upoutbarrier,
    uint _di_barrier, */
      let result = await yieldOfferings.addOfferingList("offerig1", [12,30,900,3,1200,600],"weekly" );
      let result2 = await yieldOfferings.addOfferingList("offerig2", [3,3,3,3,3,3],"daily" );

      
      //console.log (offeringsarray)

let buy = await yieldOfferings.buyOffering(1, {from : accounts[1],value:web3.utils.toWei("1", "ether") });
let buy2 = await yieldOfferings.buyOffering(2, {from : accounts[2], value:1 });
let offeringsarray = await yieldOfferings.getOfferings();
console.log (offeringsarray)

console.log("==============================================================")
let getContracts = await yieldOfferings.getAllContracts();
console.log(getContracts)
console.log("==============================================================")

let depositToWallet = await yieldOfferings.depositToWallet ({from : accounts[0],value:web3.utils.toWei("5", "ether")})


console.log("============================")
let bal = await yieldOfferings.getContractETH ();
console. log ("ether in contract before:",web3.utils.fromWei(bal))

let balweth = await yieldOfferings.getWETHBalance()
console.log("WETH in contract Before:",balweth.toString())


let usdtBal = await yieldOfferings.getUSDTBalance()
console.log("USDT in contract Before:",usdtBal.toString())





let exchange = await yieldOfferings.swapETHFromBuiltInWallet(115000000000000, {from :accounts[0] })




let bal2 = await yieldOfferings.getContractETH ();
console. log ("ether in contract after:", web3.utils.fromWei(bal2))

let balweth2 = await yieldOfferings.getWETHBalance()
console.log("WETH AFTER:",balweth2.toString())


let usdtBal2 = await yieldOfferings.getUSDTBalance()
console.log("USDT in contract after:",web3.utils.fromWei(usdtBal2))


//First Path
//let first_try = await yieldOfferings.WeeklyofferingsLoader(2200,2500) //SUCCSESS
//let second_try = await yieldOfferings.WeeklyofferingsLoader(2300,2500) //SUCCESS
//let third_try = await yieldOfferings.WeeklyofferingsLoader(2600,2500) //SUCCESS
//let fourth_try = await yieldOfferings.WeeklyofferingsLoader(1550,2500) //SUCCESS
//let fifth_try = await yieldOfferings.WeeklyofferingsLoader(1450,2500) //SUCCESS
let sixth_try = await yieldOfferings.WeeklyofferingsLoader(1800,2500) //SUCCESS
//console.log(buy.toString())
//await yieldOfferings.events.getContract();


    });

});
