// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Collectible is ERC721URIStorage {

    using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;


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

  mapping(address => uint256) public donatedAmount;
  mapping(address => uint256) public donatorAmount;
  mapping(address => uint256) public donatorAmountNFT;
  mapping(address => uint256) public addressToId;
  mapping(address => address[]) public donatedToDonators;
  mapping(address => address[]) public donatedToDonatorsNFT;
  mapping(address => string) public donatorsURI;
  

  mapping(address => uint256[]) public donatorToTokenId;
   
 
   constructor() ERC721("ElonMusk", "ELON")  {}


 
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
