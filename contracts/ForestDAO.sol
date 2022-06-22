// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERC20Token.sol";

contract ForestDAO is ERC721URIStorage {
  ERC20Token private ticketToken;
  ERC20Token private treeDAOToken;
  
  using Counters for Counters.Counter;
  Counters.Counter public treeIds;
  mapping(uint => Tree) public listoftrees;
  uint public proposalCount = 0;
  mapping(uint => TreeProposal) public listofProposal;

  uint public prizePool = 10000 * 1e18;

  struct Tree {
    uint tokenId;
    address owner;
  }

  event TreeCreated (
    uint256 tokenId,
    address owner
  );

  struct TreeProposal {
    uint id;
    string detail;
    uint yes;
    uint no;
    uint date;
    address owner;
  }

  event ProposalCreated (
    uint id,
    string details,
    uint yes,
    uint no,
    uint date,
    address owner
  );

  event ProposalVote (
    uint id,
    string result,
    address from
  );

  event WonWheel (
    address buyer,
    string result,
    uint amount,
    uint randomNumber,
    uint wheelNumber
  );

  constructor(ERC20Token _ticketToken, ERC20Token _treeDAOToken) ERC721("COTree NFT", "COT") {
    ticketToken = _ticketToken;
    treeDAOToken = _treeDAOToken;
  }

  function mintTree(string memory _cid) public payable returns (uint) {
    treeIds.increment();
    uint256 newTreeId = treeIds.current();

    _mint(msg.sender, newTreeId);
    _setTokenURI(newTreeId, _cid);

    listoftrees[newTreeId] = Tree(newTreeId, msg.sender);
    emit TreeCreated(newTreeId, msg.sender);

    return newTreeId;
  }

  function createProposal(string memory _detail) public returns (uint) {
    proposalCount++;
    listofProposal[proposalCount] = TreeProposal(proposalCount, _detail, 0, 0, block.timestamp, msg.sender);
    emit ProposalCreated(proposalCount, _detail, 0, 0, block.timestamp, msg.sender);

    return proposalCount;
  }

  function voteYes(uint _proposalId) external {
    TreeProposal memory _treeProposal = listofProposal[_proposalId];
    _treeProposal.yes += 1;
    listofProposal[_proposalId] = _treeProposal;
    ticketToken.mint(msg.sender, 5 * 1e18);

    emit ProposalVote(_proposalId, "Yes", msg.sender);
  }

  function voteNo(uint _proposalId) external {
    TreeProposal memory _treeProposal = listofProposal[_proposalId];
    _treeProposal.no += 1;
    listofProposal[_proposalId] = _treeProposal;
    ticketToken.mint(msg.sender, 5 * 1e18);

    emit ProposalVote(_proposalId, "No", msg.sender);
  }

  function buyTreeDao(uint _amount) public {
      treeDAOToken.mint(msg.sender, _amount * 1e18);
    }

  function useTicketToken() public {
      ticketToken.burn(msg.sender, 10 ** 18);
      uint randomNumber = getRandomValue(100);
      string memory result;
      uint amount;
      uint wheelNumber;

      if(randomNumber > 90){
          result = "50% Prize Pool";
          amount = (prizePool * 50) / 100;
          prizePool -= amount;
          treeDAOToken.mint(msg.sender, amount * 1e18);
          wheelNumber = 8;
      }
      else if(randomNumber > 80){
          result = "25% Prize Pool";
          amount = (prizePool * 25) / 100;
          prizePool -= amount;
          treeDAOToken.mint(msg.sender, amount * 1e18);
          wheelNumber = 7;
      }
      else if(randomNumber > 70){
          result = "10 Tickets";
          amount = 0;
          ticketToken.mint(msg.sender, 10 * 10 ** 18);
          wheelNumber = 6;
      }
      else if(randomNumber > 60){
          result = "5 Tickets";
          amount = 0;
          ticketToken.mint(msg.sender, 5 * 10 ** 18);
          wheelNumber = 5;
      }
      else if(randomNumber > 50){
          result = "15% Prize Pool";
          amount = (prizePool * 15) / 100;
          prizePool -= amount;
          treeDAOToken.mint(msg.sender, amount * 1e18);
          wheelNumber = 4;
      }
      else if(randomNumber > 50){
          result = "10% Prize Pool";
          amount = (prizePool * 10) / 100;
          prizePool -= amount;
          treeDAOToken.mint(msg.sender, amount * 1e18);
          wheelNumber = 3;
      }
      else if(randomNumber > 30){
          result = "5% Prize Pool";
          amount = (prizePool * 5) / 100;
          prizePool -= amount;
          treeDAOToken.mint(msg.sender, amount * 1e18);
          wheelNumber = 2;
      }
      else{
          result = "Nothing";
          amount = 0;
          wheelNumber = 1;
      }

      emit WonWheel(msg.sender, result, amount, randomNumber, wheelNumber);
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

  function getRandomValue(uint mod) internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % mod;
  }
}