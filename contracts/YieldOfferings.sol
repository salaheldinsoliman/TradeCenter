pragma solidity 0.8.9;

import "./TradeCenter.sol";
//import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";

import "./ERC20.sol";
import "./DateTime.sol";

interface _ERC20{
  function deposit() external payable;
  function withdraw(uint256 amount) external;
  function name() external returns (string memory);
  
}

contract YieldOfferings is TradeCenter, DateTime {
   
_ERC20 weth;  
//ERC20 usdt;
address public owner = msg.sender; // contract owner
 // will be used in logic
uint offeringCount = 0; // keep track of all number
uint contractCount=1;
uint walletCount=0;
uint[] public MonthlyofferingIDList; // all ids list
uint[] public WeeklyofferingIDList;
uint[] public DailyofferingIDList;
address[] walletOwners;
string aloo = "Bought!";
int[][][] EthPriceLog;
//address WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

//mapping (address=> bool) public hasWallet;

//hasWallet[key] 




mapping (uint => offering) public Offerings; //mapping offerings to ids
mapping (address => wallet) public walletMap;
mapping(uint => offeringContract) ContractMap;
mapping (string => address) CoinMap;
//mapping (_DateTime => int ) EthPriceLog;

struct wallet {
uint usdt;
uint eth;
uint weth;
//uint ONEINCH;
//uint WETH;
}

struct buyer {
    address buyerAddress;

    offering[] offerings;
    uint[] ContractsIds;
    uint[] offeringIDList;
}

struct issuer {
    address issuerAddress;
    //uint256 balance;
    //uint256 accountPayable;
    uint[] offeringsList;
    //uint WalletID;
    //uint[] ContractsIds;
    //bool hasWallet;
}

mapping (address => issuer) public BuyersMap;
mapping (address => issuer) internal IssuersMap;



struct offeringContract{
    address buyer;
    address issuer;
    uint amount;
    uint offeringID;
    uint contractID;
    int ethusdt0;
}

/*uint _Nb_fixings,
    uint _high_coupon,
    uint _high_coupon_barrier,
    uint _smaller_coupon,
    uint _Upoutbarrier,
    uint _di_barrier, */


struct offering{
    address issuer;
    uint ID;
    string name;
    uint fixing_counter;
    bool Di_barrier_activated;
    uint contractID;
    string fixing_duration;
    uint [] attributes;
}


event logAddedOffering(offering);
event getContract (offeringContract);
event getIssuer (issuer);
event getWalletInfo(wallet);
// function to add a new offering 

constructor () public {

    weth = _ERC20 (WETH);
    //usdt = ERC20 (0xdAC17F958D2ee523a2206206994597C13D831ec7);
}

function SignInIssuer () public  {
require(IssuersMap[msg.sender].issuerAddress==0x0000000000000000000000000000000000000000, "Already Signed in as Issuer!" );
/*struct issuer {
    address issuerAddress;
    offering[] offerings;
    uint[] ContractsIds;
}*/
walletMap[msg.sender] = wallet (
0,
0,
0
);
walletCount = walletCount+1;

uint[] memory offeringEmptyList;
IssuersMap[msg.sender] = issuer(
msg.sender,
offeringEmptyList
);



emit getIssuer(IssuersMap[msg.sender]);

}

function supportCoin(address CoinAddress, string memory CoinName) public {
require(msg.sender == owner);
CoinMap[CoinName] = CoinAddress;

}

function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}

function addOfferingList(string memory _name,uint[] memory input, string memory fixing_duration)public{
require(IssuersMap[msg.sender].issuerAddress==msg.sender, "Please Sign In as Issuer" );
require(bytes(_name).length>0, "name cannot beval empty");
require(compareStrings(fixing_duration, "weekly") || compareStrings(fixing_duration, "monthly") || (compareStrings(fixing_duration, "daily") ) == true   );

/*
struct offering{
    address issuer;
    uint ID;
    string name;
    uint fixing_counter;
    bool Di_barrier_activated;
    uint contractID;
    string fixing_duration;
    uint [] attributes;
} */


    uint newID= offeringCount + 1;
    if (compareStrings(fixing_duration, "weekly") )
    {WeeklyofferingIDList.push(newID);}
    else if (compareStrings(fixing_duration, "monthly") )
    {MonthlyofferingIDList.push(newID);}
    else {DailyofferingIDList.push(newID);}

    uint  contractID;
    Offerings[newID] = offering(msg.sender, 
     newID, 
     _name,
     0,
     false,
     0,
    fixing_duration,
    input);
    
    offeringCount+= 1;

    emit logAddedOffering(Offerings[newID]);
}


/*function addOffering(
    string memory _name,
    uint _Nb_fixings,
    uint _high_coupon,
    uint _high_coupon_barrier,
    uint _smaller_coupon,
    uint _Upoutbarrier,
    uint _di_barrier,
    string memory fixing_duration
    
   ) public{
    require(IssuersMap[msg.sender].issuerAddress==msg.sender, "Please Sign In as Issuer" );
    require(bytes(_name).length>0, "name cannot beval empty");
    //require(IssuersMap[msg.sender].issuerAddress, msg.sender);

    uint newID= offeringCount + 1;
    //offeringContract[] storage emptyList;
    //newCampaign.deadline= block.timestamp + (_duration * 1 days);
    offeringIDList.push(newID);
    uint  contractID;
    Offerings[newID] = offering(msg.sender, 
     newID, 
     _name,
     _Nb_fixings,
     0,
     _high_coupon,
     _high_coupon_barrier,
     _smaller_coupon,
     _Upoutbarrier,
     _di_barrier,
      false,
    contractID,
    fixing_duration);
    
    offeringCount+= 1;

    
    emit logAddedOffering(Offerings[newID]);
}*/



event gets(uint);
function WeeklyofferingsLoader(int usdtPrice) public returns(uint) {

uint buyerGets;
for (uint i = 0 ; i< WeeklyofferingIDList.length ; i++)
{
buyerGets = handleFixing(Offerings[ WeeklyofferingIDList[i]], usdtPrice,0);
}
emit gets(buyerGets);
return buyerGets;
}

/*function DailyofferingsLoader() external {


for (uint i = 0 ; i< DailyofferingIDList.length ; i++)
{
handleFixing(Offerings[ DailyofferingIDList[i]]);
}

}

function MonthlyofferingsLoader() external {


for (uint i = 0 ; i< MonthlyofferingIDList.length ; i++)
{
handleFixing(Offerings[ MonthlyofferingIDList[i]]);
}

}
*/




 
function handleFixing (offering memory Offering, int usdtPrice , int ethusdt0) public returns (uint) {  //buis logic;

uint  contractID = Offering.contractID;
//int usdtPrice = getLatestPrice();
//int ethusdt0 = ContractMap[contractID].ethusdt0;

uint buyerGets;

/*uint _Nb_fixings, 0
    uint _high_coupon,1
    uint _high_coupon_barrier,2
    uint _smaller_coupon,3
    uint _Upoutbarrier,4
    uint _di_barrier, 5*/
if (Offering.attributes[0] > Offering.fixing_counter){//normal fixing logic

  if (usdtPrice < int((int(Offering.attributes[5])* ethusdt0))){
    Offering.Di_barrier_activated=true;
    }


if(usdtPrice > int (int (Offering.attributes[4])*ethusdt0)){
            
                buyerGets = ContractMap[contractID].amount + Offering.attributes[1]*ContractMap[contractID].amount;
                EndContract( contractID );

        }

else if (usdtPrice > int (Offering.attributes[2]) * ethusdt0){

buyerGets = ContractMap[contractID].amount * Offering.attributes[1];

}

else if (Offering.Di_barrier_activated==false){
    buyerGets = ContractMap[contractID].amount * Offering.attributes[3];
}

else {
    buyerGets = 0;
}

//inside normal fixings
}


else {

if (usdtPrice >int (int ( Offering.attributes[2]) * ethusdt0)){

buyerGets = Offering. attributes[1] * ContractMap[contractID].amount + ContractMap[contractID].amount;


}

else if (Offering.Di_barrier_activated= false){

buyerGets = Offering.attributes[3] * ContractMap[contractID].amount + ContractMap[contractID].amount;

}

else {

    buyerGets =uint ( ContractMap[contractID].amount) / uint (Offering.attributes[2]) / uint (ethusdt0) ;
}


//ContractMap [contractID].buyer.call{value : buyerGets}("");
return buyerGets;

}



}

function EndContract ( uint contractID) internal{

delete ContractMap[contractID];

}


function depositToWallet () public payable {
require(IssuersMap[msg.sender].issuerAddress==msg.sender || BuyersMap[msg.sender].issuerAddress==msg.sender);

walletMap[msg.sender].eth += msg.value;

emit getWalletInfo(walletMap[msg.sender]);

}

event getAmounts(uint[]);

function swapETHFromBuiltInWallet (uint amount)public returns(uint [] memory) {

require(walletMap[msg.sender].eth >= amount);
uint deadline = block.timestamp + 100;
    address[] memory path = new address[](2);
    path[0] = WETH;
    path[1] = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

//WETH.call{value : amount}("");
weth.deposit{value : amount}();

uint amount_min =  getAmountOutMin(WETH, 0x6B175474E89094C44Da98b954EedeAC495271d0F , amount);
uint [] memory amounts = simpleswap(WETH, 0x6B175474E89094C44Da98b954EedeAC495271d0F, amount, amount_min);

emit getAmounts(amounts);
walletMap[msg.sender]. usdt += amounts[1];
walletMap[msg.sender] .eth -= amount;

//IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactETHForTokens {value : amount} (0,path,address(this),deadline);
emit getWalletInfo(walletMap[msg.sender]);
return amounts;
}



function buyOffering(uint _id) public payable returns(string memory) {
    //require (Offerings[_id].contractID == 0);

/*struct offeringContract{
    address buy
    address issuer;
    uint amount;
    uint offeringID;
    uint contractID;
}*/


uint buyTimestamp = block.timestamp;
int ethusdt0 = getLatestPrice();
ContractMap[contractCount] = offeringContract(
    msg.sender,
    Offerings[_id].issuer,
    msg.value,
    _id,
    contractCount,
    ethusdt0

);
Offerings[_id]. contractID = contractCount;
//emit getContract(ContractMap[contractCount].buyer,ContractMap[contractCount].issuer,ContractMap[contractCount].amount,ContractMap[contractCount].offeringID,ContractMap[contractCount].contractID);
emit getContract(ContractMap[contractCount]);
contractCount+=1;

walletMap [Offerings[_id].issuer] . eth = msg.value ;


//emit getWalletInfo (walletMap [Offerings[_id].issuer]);
//Offerings[_id]. contractList . append()

return aloo;

}
/*
function checkCustody(address _issuer, uint tbs) public returns(bool){
    bool isAllowed= false;
    uint256 issuerBalance= _issuer.balance;
    //check all linked offerings to issuer

}*/




function getCount() public view returns(uint count) {
    return WeeklyofferingIDList.length;
}

function getContractCount() public view returns (uint count){

return contractCount;

}

function getContractETH () public view returns (uint){

return address(this).balance;
    
}

function getOfferings () public view returns (offering[] memory){

offering[] memory toReturn= new offering[](offeringCount) ;

for (uint i = 0 ; i< offeringCount ; i++){

toReturn [i] = Offerings[i+1];

}

return  toReturn; //mapping offerings to ids

}


function getAllContracts() public view returns (offeringContract[] memory){

offeringContract[] memory toReturn= new offeringContract[](contractCount) ;

for (uint i = 0 ; i< contractCount ; i++){

toReturn [i] = ContractMap[i];

}

return  toReturn; //mapping offerings to ids


}


function getDayFromTimeStamp() public view returns (uint8) {

return parseTimestamp(block.timestamp).day;
}

function fillPriceLog () public {

int price = getLatestPrice();

_DateTime memory key = parseTimestamp(block.timestamp);

uint16 year =  key.year;
uint8 month =  key.month;
uint8 day =  key.day;


EthPriceLog [year][month][day] = price;
  }




// contract's brace
}


