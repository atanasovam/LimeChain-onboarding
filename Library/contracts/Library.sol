// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Library is Ownable {
    struct Book {
        string name;
        uint availableCopiesCount;
        address[] clientAddresses;
        mapping (address => bool) clients;
    }

    bytes32[] public allBookIDs;    
    mapping (bytes32 => Book) public books;

    function createBook(uint _availableCopies, string memory _name) public onlyOwner isThisNameTaken(_name) {
        Book memory book = Book(_name, _availableCopies, new address[](0));
        bytes32 id = callKeccak256(_name);

        books[id] = book;
        allBookIDs.push(id);
    }
    
    function changeBookCopiesCount(string memory _name, uint _copiesCount) public onlyOwner {
        bytes32 id = callKeccak256(_name);
        books[id].availableCopiesCount = _copiesCount;
    }
    
    function seeAllClientsByBookId(string memory _name) public view returns(address[] memory) {
        bytes32 id = callKeccak256(_name);
        return books[id].clientAddresses;
    }

    function borrowBook(string memory _name) public isAvailable(_name) {
        bytes32 id = callKeccak256(_name);
        
        require(!books[id].clients[msg.sender], "Already borrowed!");

        books[id].availableCopiesCount--;
        
        books[id].clients[msg.sender] = true;
        books[id].clientAddresses.push(msg.sender);
    }

    function returnBook(string memory _name) public {
        bytes32 id = callKeccak256(_name);
        
        require(books[id].clients[msg.sender], "Not borrowed!");
        
        books[id].clients[msg.sender] = false;
        books[id].availableCopiesCount++;
    }
    
    function viewAllBooksCount() public view returns(uint) {
        return allBookIDs.length;
    }
    
    function callKeccak256(string memory _text) private pure returns(bytes32 result) {
      return keccak256(abi.encodePacked(_text));
    }  

    modifier isAvailable(string memory _name) {
        bytes32 id = callKeccak256(_name);
        require(books[id].availableCopiesCount > 0, "This book isn't available!");
        _;
    }

    modifier isThisNameTaken(string memory _name) {
        bytes32 id = callKeccak256(_name);
        uint256 nameLength = bytes(books[id].name).length;
        
        require(nameLength <= 0, "This name is already taken!");
        _;
    }
}