/*const { assert } = require("chai")
const chai= require ("chai");

chai .use (require("chai-as-promised"))
const expect=chai.expect

const tokenSwap = artifacts.require("tokenSwap")

 

contract ("tokenSwap",accounts => {


    let swap
    beforeEach(async() => {
        swap = await tokenSwap.new()
    })
    

    it ("swaps tokens", async()=>{

let a = await swap.swap()
console.log(a.toNumber())
let address = await tradeCenter.address
console.log(address)


let send = await web3.eth.sendTransaction({from:accounts[0],to:tradeCenter.address, value:web3.utils.toWei("10", "link")});
balance = await web3.eth.getBalance(tradeCenter.address)
console.log("Current tradeCenter Balance: ",web3.utils.fromWei(balance, "link"), "ether")


    })



})*/

