// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ForestDAO is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public treeIds;
    mapping(uint => Tree) public listoftrees;

    struct Tree {
      uint tokenId;
      address owner;
    }

    event TreeCreated (
      uint tokenId,
      address owner
    );

    constructor() ERC721("COTree NFT", "COT") {
    }

    function mintTree() public payable returns (uint) {
      treeIds.increment();
      uint256 newTreeId = treeIds.current();

      _mint(msg.sender, newTreeId);

      listoftrees[newTreeId] = Tree(newTreeId, msg.sender);
      emit TreeCreated(newTreeId, msg.sender);

      return newTreeId;
    }

  function fetchUserTreeNFTs(address _userAddress) public view returns (Tree[] memory) {
    uint totalNFTCount = treeIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalNFTCount; i++) {
      if (listoftrees[i + 1].owner == _userAddress) {
        itemCount += 1;
      }
    }

    Tree[] memory items = new Tree[](itemCount);

    for (uint i = 0; i < totalNFTCount; i++) {
      if (listoftrees[i + 1].owner == _userAddress) {
        uint currentId = i + 1;
        Tree storage currentTree = listoftrees[currentId];
        items[currentIndex] = currentTree;
        currentIndex += 1;
      }
    }

    return items;   
  }
}