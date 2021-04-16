// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.5;

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
    
    modifier validateInputData(string memory _name, uint _count) {
        require(_count > 0, "Count shouldn't be 0!");
        require(bytes(_name).length > 0, "Name shouldn't be an empty string!");
        _;
    }

    modifier bookExists(string memory _name) {
        bytes32 id = callKeccak256(_name);
        require(books[id].availableCopiesCount == 0, "This name is already taken!");
        _;
    }
    
    modifier isAvailable(bytes32 _id) {
        require(books[_id].availableCopiesCount > 0, "This book isn't available!");
        _;
    }

    function createBook(uint _availableCopies, string memory _name) public onlyOwner validateInputData(_name, _availableCopies) bookExists(_name) {
        address[] memory addresses;
        Book memory book = Book(_name, _availableCopies, addresses);

        bytes32 id = callKeccak256(_name);

        books[id] = book;
        allBookIDs.push(id);
        
        emit LogAddedBook(id);
    }
    
    function seeAllClientsByBookId(bytes32 _id) public view returns(address[] memory) {
        return books[_id].clientAddresses;
    }

    function borrowBook(bytes32 _id) public isAvailable(_id) {
        require(!borrowedBooks[msg.sender][_id], "Already borrowed!");

        books[_id].availableCopiesCount--;
        
        borrowedBooks[msg.sender][_id] = true;
        books[_id].clientAddresses.push(msg.sender);
        
        emit BookBorrowed(_id);
    }

    function returnBook(bytes32 _id) public {
        require(borrowedBooks[msg.sender][_id], "Not borrowed!");
        
        borrowedBooks[msg.sender][_id] = false;
        books[_id].availableCopiesCount++;
        
        emit BookReturned(_id);
    }
    
    function viewAllBooksCount() public view returns(uint) {
        return allBookIDs.length;
    }
    
    function callKeccak256(string memory _text) private pure returns(bytes32 result) {
      return keccak256(abi.encodePacked(_text));
    }
}