pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/utils/Counters.sol";


contract ArtPiece is ERC721 {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;
    mapping(address => string) owners;


  constructor() ERC721("ArtPiece", "ARTWORK") public {
  }


    function mint(address recipient, string memory hash, string memory metadata)
      public
      returns (uint256)
    {
      require(hashes[hash] != 1);
      hashes[hash] = 1;
      
      _tokenIds.increment();
      uint256 newItemId = _tokenIds.current();
      _mint(recipient, newItemId);
      _setTokenURI(newItemId, hash);
      owners[recipient] = hash;
      return newItemId;
    }

    function getURI(address owner) public returns (string memory)
    {
        string memory hash = owners[owner];
        return hash;
    }

}
