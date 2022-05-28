// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Collectible is ERC721URIStorage {

    using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   uint256 public withdrawDue = 7 days;


   struct Donated{
    uint256 id;
    string name;
    string title;
    string definition;
    address donatedAddress;
    uint256 requiredAmount;
    uint256 requiredDate;
  }

   

  Donated[] public donatedInfo;

  address[] public funders;
  address[] public fundersNFT;

  mapping(address => uint256) public donatedAmount; // @param donated address @value how much money donated for this project
  mapping(address => mapping(address => uint256)) public donatorAmount;   // @param1 donated address @param2 donator address @value amount
  mapping(address => mapping(address => uint256)) public donatorAmountNFT;  // @param1 donated address @param2 donator address @value amount (for nft)
  mapping(address => uint256) public addressToId; 
  mapping(address => address[]) public donatedToDonators; // @param donated address @value donators array
  mapping(address => address[]) public donatedToDonatorsNFT;  // @param donated address @value donators array (for nft)
  mapping(address => string) public donatorsURI;
  

  mapping(address => uint256[]) public donatorToTokenId;
   
 
  constructor() ERC721("FundMe", "FM")  {}

 
   function mintNFT(string memory _tokenURI)
       internal
       {
           _tokenIds.increment();
           uint256 newItemId = _tokenIds.current();
           _mint(msg.sender, newItemId);
           _setTokenURI(newItemId, _tokenURI);
           // console.log("The NFT ID %s has been minted to %s", newItemId, msg.sender);
           donatorToTokenId[msg.sender].push(newItemId);
    }

    function setTokenURI(string memory _tokenURI, address _ownerOfURI) internal{
    string memory TokenURI = _tokenURI;
    donatorsURI[_ownerOfURI] = TokenURI;
  }

  function handleDistribution(uint256 _id) internal {
    address[] memory nftCollecters = donatedToDonatorsNFT[donatedInfo[_id].donatedAddress];
    for(uint256 i = 0; i < nftCollecters.length; i++){      
        mintNFT(donatorsURI[nftCollecters[i]]);     
    }
  }

  


}
