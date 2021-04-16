// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Library is Ownable {
    struct Book {
        string name;
        uint availableCopiesCount;
        address[] clientAddresses;
    }
    
    bytes32[] public allBookIDs;
    
    mapping (bytes32 => Book) public books;
    mapping (address => mapping (bytes32 => bool)) borrowedBooks;
    
    event LogAddedBook(bytes32 id);
    event BookBorrowed(bytes32 id);
    event BookReturned(bytes32 id);
    
    modifier isNameValid(string memory _name) {
        require(bytes(_name).length > 0, "Name shouldn't be an empty string!");
        
        bytes32 id = callKeccak256(_name);
        require(books[id].availableCopiesCount == 0, "This name is already taken!");
        _;
    }
    
    modifier isCountValid(uint _count) {
        require(_count > 0, "Count shouldn't be 0!");
        _;
    }
    
    modifier isAvailable(string memory _name) {
        bytes32 id = callKeccak256(_name);
        require(books[id].availableCopiesCount > 0, "This book isn't available!");
        _;
    }

    function createBook(uint _availableCopies, string memory _name) public onlyOwner isNameValid(_name) isCountValid(_availableCopies) {
        address[] memory addresses;
        Book memory book = Book(_name, _availableCopies, addresses);

        bytes32 id = callKeccak256(_name);

        books[id] = book;
        allBookIDs.push(id);
        
        emit LogAddedBook(id);
    }
    
    function changeBookCopiesCount(string memory _name, uint _copiesCount) public onlyOwner isCountValid(_copiesCount) {
        bytes32 id = callKeccak256(_name);
        books[id].availableCopiesCount = _copiesCount;
    }
    
    function seeAllClientsByBookId(string memory _name) public view returns(address[] memory) {
        bytes32 id = callKeccak256(_name);
        return books[id].clientAddresses;
    }

    function borrowBook(string memory _name) public isAvailable(_name) {
        bytes32 id = callKeccak256(_name);
        
        require(!borrowedBooks[msg.sender][id], "Already borrowed!");

        books[id].availableCopiesCount--;
        
        borrowedBooks[msg.sender][id] = true;
        books[id].clientAddresses.push(msg.sender);
        
        emit BookBorrowed(id);
    }

    function returnBook(string memory _name) public {
        bytes32 id = callKeccak256(_name);
        
        require(borrowedBooks[msg.sender][id], "Not borrowed!");
        
        borrowedBooks[msg.sender][id] = false;
        books[id].availableCopiesCount++;
        
        emit BookReturned(id);
    }
    
    function viewAllBooksCount() public view returns(uint) {
        return allBookIDs.length;
    }
    
    function callKeccak256(string memory _text) private pure returns(bytes32 result) {
      return keccak256(abi.encodePacked(_text));
    }
}