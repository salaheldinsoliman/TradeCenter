const { assert } = require("chai")
const chai= require ("chai");

chai .use (require("chai-as-promised"))
const expect=chai.expect

const TradeCenter = artifacts.require("TradeCenter")
const ERC20 =artifacts.require("ERC20")
const {time}= require('@openzeppelin/test-helpers');

//console.log (ERC20)


 

contract ("TradeCenter",accounts => {


    let tradeCenter
    let DAI
    beforeEach(async() => {
        tradeCenter = await TradeCenter.deployed()
        DAI = await ERC20.at("0x111111111117dC0aa78b770fA6A738034120C302")
        
    })

    
    

    it ("prints eth/usdt price", async()=>{

       

        let name = await DAI.name()
        console.log (name)
let send = await DAI.transfer(tradeCenter.address, 30000, {from : "0xF977814e90dA44bFA03b6295A0616a897441aceC"})


//let send2 = await web3.eth.sendTransaction({from:accounts[0],to:tradeCenter.address, value:web3.utils.toWei("0.1", "ether")});
/*let a = await tradeCenter.getLatestPrice()
console.log(a.toNumber())
let address = await tradeCenter.address
console.log(address)*/


let b = await tradeCenter.getDaiBalance()
console.log("DAI Before:",b.toString())



let weth = await tradeCenter.getWETHBalance()
console.log("weth:",weth.toString())

//IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(tokens_in, 0, path , _to, block.timestamp);
//this path array will have 3 addresses [tokenIn, WETH, tokenOut]
//let path = ["0x13512979ade267ab5100878e2e0f485b568328a4", "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa"] 
//function simpleswap(address _tokenIn, address _tokenOut, uint256 _amountIn, uint256 _amountOutMin) 

//await DAI.approve("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", 1000)
let amount_min = await tradeCenter.getAmountOutMin("0x111111111117dC0aa78b770fA6A738034120C302","0x6B175474E89094C44Da98b954EedeAC495271d0F",10000)
console.log(amount_min.toString())

let exchange = await tradeCenter.simpleswap("0x111111111117dC0aa78b770fA6A738034120C302","0x6B175474E89094C44Da98b954EedeAC495271d0F", 10000, amount_min.toString() )
//console.log (exchange.toString())

//function swap(address _tokenIn, address _tokenOut, uint256 _amountIn, uint256 _amountOutMin, address _to) external
//let exchange = await tradeCenter.swap()

time.increase (50000000000)

let y = await tradeCenter.getDaiBalance()
console.log("DAI After",y.toString())


let z = await tradeCenter.getWETHBalance()
console.log("WETH AFTER:",z.toString())


/*let send = await web3.eth.sendTransaction({from:accounts[0],to:tradeCenter.address, value:web3.utils.toWei("10", "link")});
balance = await web3.eth.getBalance(tradeCenter.address)
console.log("Current tradeCenter Balance: ",web3.utils.fromWei(balance, "link"), "ether")
*/

    })



})







//https://mainnet.infura.io/v3/2c429d4bb7e94ca6b78f8a61fdd5d58c