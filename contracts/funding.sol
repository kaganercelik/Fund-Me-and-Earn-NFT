// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collectible.sol";


contract Funding is Ownable, Collectible{

  uint256 public time;

  uint256 internal id = 0;

  


 

  //    Constructor

  constructor() {
      transferOwnership(msg.sender);
  }

  // Modifiers

  modifier amount(uint256 _id) {
    require(donatedAmount[msg.sender] >= donatedInfo[_id].requiredAmount,"Required amount is not reached");
    _;
  }

  modifier onlyOwnerOf(uint256 _id){
      require(msg.sender == donatedInfo[_id].donatedAddress);
      _;
  }

 


  function _isReady(Donated storage _donated) internal view returns(bool){
    return (_donated.requiredDate >= block.timestamp);
  }

  // Events

  event Withdraw(address indexed from, uint256 indexed id, uint256 value );

  // Setters

  function setDonated(
    string memory _name,
    string memory _title,
    string memory _definition,
    uint256 _requiredAmount,
    uint256 _requiredDate
  ) public {
      

    Donated memory donated =  Donated(
        id,
      _name,
      _title,
      _definition,
      msg.sender,
      _requiredAmount,
      _requiredDate
    );

    donatedInfo.push(donated);
    addressToId[msg.sender] = id;
    id = id + 1;
    
  }

  //  Only Owner

  // Handles if a project is met the requirements
  // But the money is not withdraw after 1 week
  // Only the owner of the contract can call this
  

  function dueDatehandler(uint256 _id) public onlyOwner {
    require(block.timestamp >= donatedInfo[_id].requiredDate + withdrawDue,"ERROR : Project can not be ended!!!");
    address donated_address = donatedInfo[_id].donatedAddress;
    for(uint256 i=0 ; i < donatedToDonators[donated_address].length ; i ++  ){
      payable(donatedToDonators[donated_address][i]).transfer(donatorAmount[donated_address][donatedToDonators[donated_address][i]]);
      payable(donatedToDonatorsNFT[donated_address][i]).transfer(donatorAmountNFT[donated_address][donatedToDonatorsNFT[donated_address][i]]);
    }
  }
  
  // Getters
    
  function getContractAddress() external view returns(address) {
    return address(this);    
  }

  function getDonatedAmount(address _donated) external view returns(uint256){
    return donatedAmount[_donated];
  }

  function getDonatorAmount(uint256 _id, address _donator) public view returns(uint256) {
      return donatorAmount[donatedInfo[_id].donatedAddress][_donator];
  }

  function getBalanceOfProject(uint256 _id) public view returns(uint256) {
      return donatedAmount[donatedInfo[_id].donatedAddress];
  }

  


  function getNow() internal view returns(uint256){
      return block.timestamp;
  }

  function getId() public view returns(uint256) {
      return addressToId[msg.sender];
  }

  function getDonatedToDonators(uint256 _id) public view returns(address[] memory){
      return donatedToDonators[donatedInfo[_id].donatedAddress];
  }

  

  

  // Fund and Withdraw

  function fund(uint256 _id) public payable {
    donatedAmount[donatedInfo[_id].donatedAddress] += msg.value;
    donatorAmount[donatedInfo[_id].donatedAddress][msg.sender] += msg.value;
    funders.push(msg.sender);
    donatedToDonators[donatedInfo[_id].donatedAddress].push(msg.sender);
  }

  function fundEarnNft(uint256 _id,string memory tokenURI) public payable {
    require(donatorAmountNFT[donatedInfo[_id].donatedAddress][msg.sender] == 0,"You can earn only 1 nft for a project");

    donatedAmount[donatedInfo[_id].donatedAddress] += msg.value;
    donatorAmountNFT[donatedInfo[_id].donatedAddress][msg.sender] += msg.value;
    funders.push(msg.sender);
    donatedToDonatorsNFT[donatedInfo[_id].donatedAddress].push(msg.sender);
    setTokenURI(tokenURI, msg.sender);
  }

  function withdraw(uint256 _id) public payable amount(_id) onlyOwnerOf(_id) {
    require(block.timestamp >= donatedInfo[_id].requiredDate,"Required date must be met");
    payable(msg.sender).transfer(donatedAmount[msg.sender]);
    emit Withdraw(msg.sender, _id, donatedAmount[msg.sender]);
    donatedAmount[msg.sender] = 0;
    donatedToDonators[donatedInfo[_id].donatedAddress] = new address[](0); 
    
    handleDistribution(_id);
    donatedToDonatorsNFT[donatedInfo[_id].donatedAddress] = new address[](0);
  } 


  
}