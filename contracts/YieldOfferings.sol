pragma solidity 0.8.9;

contract YieldOfferings {
   
address public owner = msg.sender; // contract owner
 // will be used in logic
uint offeringCount = 0; // keep track of all number
uint contractCount=0;
uint walletCount=0;
uint[] public offeringIDList; // all ids list
address[] walletOwners;
string aloo = "Bought!";

//mapping (address=> bool) public hasWallet;

//hasWallet[key] 



uint price= 2400;
uint ethusdt0= 2300;

mapping (uint => offering) public Offerings; //mapping offerings to ids
mapping (address => wallet) public wallets;
mapping(uint => offeringContract) ContractMap;

struct wallet {
uint usdt;
uint eth;
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
    uint256 accountPayable;
    offering[] offerings;
    uint[] ContractsIds;
    bool hasWallet;
}

struct offeringContract{
    address buyer;
    address issuer;
    uint amount;
    uint offeringID;
    uint contractID;
}

struct offering{
    address issuer;
    uint ID;
    string name;
    uint Nb_fixings;
    uint fixing_counter;
    uint high_coupon;
    uint high_coupon_barrier;
    uint smaller_coupon;
    uint Upoutbarrier;
    uint di_barrier;
    bool Di_barrier_activated;
    uint[] contractList;
}


event logAddedOffering(uint, string, address);
event getContract (address,address,uint,uint,uint);
// function to add a new offering 
function addOffering(
    string memory _name,
    uint _Nb_fixings,
    uint _high_coupon,
    uint _high_coupon_barrier,
    uint _smaller_coupon,
    uint _Upoutbarrier,
    uint _di_barrier
    
   ) public{
    
    require(bytes(_name).length>0, "name cannot beval empty");

    uint newID= offeringCount + 1;
    //offeringContract[] storage emptyList;
    //newCampaign.deadline= block.timestamp + (_duration * 1 days);
    offeringIDList.push(newID);
    uint[] memory contractList;
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
    contractList);
    
    offeringCount+= 1;

    bool ownsWallet= false;
    for (uint i=0; i< walletOwners.length; i++){
        if (walletOwners[i] == msg.sender)
        ownsWallet= true;
        break;
    }

    if (ownsWallet== false){
        wallets[msg.sender]= wallet(0,0);
        walletCount +=1;
    }

    emit logAddedOffering(Offerings[newID].ID, Offerings[newID].name, Offerings[newID].issuer);
}


    
/////// BUY BACK PART /////////
// how will we know the agreed on price?
// how will the issuer fail to pay a coupon?

/*function checkPayables(uint256 id) public returns(uint){
    uint buyerGets;
    Offerings[ContractMap[id].offeringID].fixing_counter+=1;
    if (price< (Offerings[ContractMap[id].offeringID].di_barrier* ethusdt0)){
    Offerings[ContractMap[id].offeringID].Di_barrier_activated=true;
    }


    // if not last fixing
    if (Offerings[ContractMap[id].offeringID].fixing_counter< Offerings[ContractMap[id].offeringID].Nb_fixings){
        if(price > Offerings[ContractMap[id].offeringID].Upoutbarrier*ethusdt0){
            // send amount X to buyer+ high_coupon X
            buyerGets= ContractMap[id].amount + (Offerings[ContractMap[id].offeringID].high_coupon*ContractMap[id].amount);
        }
        else if (price> Offerings[ContractMap[id].offeringID].high_coupon_barrier*ethusdt0){
            // send buyer hight_couponX
            buyerGets= Offerings[ContractMap[id].offeringID].high_coupon*ContractMap[id].amount;

        }
        else if (Offerings[ContractMap[id].offeringID].Di_barrier_activated== false){
            //buyer get smaller_couponX
            buyerGets= ContractMap[id].amount + Offerings[ContractMap[id].offeringID].smaller_coupon * ContractMap[id].amount;

        }
        else {
            // buyer gets nothing
            buyerGets=0;
        }
    }

    else{
        
        if (price> Offerings[ContractMap[id].offeringID].high_coupon_barrier*ethusdt0){
            // send buyer hight_couponX + X (what is this amount?)
            buyerGets= ContractMap[id].amount + (Offerings[ContractMap[id].offeringID].high_coupon*ContractMap[id].amount);
  
        }
        else if(Offerings[ContractMap[id].offeringID].Di_barrier_activated= false){
            
            //buyer gets lower_coupon*X+X
            
            buyerGets= ContractMap[id].amount + (Offerings[ContractMap[id].offeringID].smaller_coupon *ContractMap[id].amount);

            
        
        }
        else {
            //X= getamount(id,)
            buyerGets= (ContractMap[id].amount/Offerings[ContractMap[id].offeringID].high_coupon_barrier)/ ethusdt0;    
        }
        
    }


}*/

/*function Payements (offering Offering, uint usdtPrice) internal {


contractIDList = offering.contractList;

  if (usdtPrice < (Offering.di_barrier* ethusdt0)){
    Offering.Di_barrier_activated=true;
    }


if(usdtPrice > Offering.Upoutbarrier*ethusdt0){

            for (int i =0; i< contractIDList.length ; i++){


                uint buyerGets = ContractMap[i].amount + offering.high_coupon*ContractMap[i].amount;
            }
        }




}
*/


function buyOffering(uint _id) public payable returns(string memory) {

/*struct offeringContract{
    address buy
    address issuer;
    uint amount;
    uint offeringID;
    uint contractID;
}*/



ContractMap[contractCount] = offeringContract(
    msg.sender,
    Offerings[_id].issuer,
    msg.value,
    _id,
    contractCount
);
Offerings[_id]. contractList . push(contractCount);
emit getContract(ContractMap[contractCount].buyer,ContractMap[contractCount].issuer,ContractMap[contractCount].amount,ContractMap[contractCount].offeringID,ContractMap[contractCount].contractID);
contractCount+=1;



//Offerings[_id]. contractList . append()

return aloo;

}

function checkCustody(address _issuer, uint tbs) public returns(bool){
    bool isAllowed= false;
    uint256 issuerBalance= _issuer.balance;
    //check all linked offerings to issuer

}

function getCount() public view returns(uint count) {
    return offeringIDList.length;
}

function getContractCount() public view returns (uint count){

return contractCount;

}


// contract's brace
}


