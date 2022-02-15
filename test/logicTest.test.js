const { assert } = require("chai")
const chai= require ("chai");

chai .use (require("chai-as-promised"))
const expect=chai.expect

const YeildOfferings = artifacts.require("YieldOfferings")


contract ("YeildOfferings",accounts => {


    let yeildOfferings
    //let DAI
    beforeEach(async() => {
        yeildOfferings = await YeildOfferings.deployed()
        //DAI = await ERC20.at("0x111111111117dC0aa78b770fA6A738034120C302")
        
    })



it ("adds offerings", async()=>{


    function addOffering(
        string memory _name,
        uint _Nb_fixings,
        uint _high_coupon,
        uint _high_coupon_barrier,
        uint _smaller_coupon,
        uint _Upoutbarrier,
        uint _di_barrier)


let addOffer = await yeildOfferings.addOffering("first_try", 3,3,3,3,3,3)


let getOffer = await yeildOfferings.getOffer()
console.log(getOffer)





})


})

