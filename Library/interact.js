const { ethers } = require("ethers");
const dotenv = require('dotenv');

const libraryInteraction = require("./library-contract-interaction");
const Library = require("./build/Library.json");
const LIBWrapper = require("./build/LIBWrapper.json");

const run = async () => {
	dotenv.config();

	const provider = new ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173");
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY__ROPSTEN, provider);
	const contract = new ethers.Contract("0x601A30e7b7159ab2b9fAF5917fDfb8aee5ee154A", LIBWrapper.abi, wallet);
	const address = await contract.LIBToken();
	console.log(address);

	// local
	//const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
	// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY__ROPSTEN, provider);
	// const contract = new ethers.Contract("0xb314d2b0ACFD442E088cD7A6bd68810611B54956", Librar.abi, wallet);

	// const balance = await contract.getCurrentBalance()
	// console.log(balance);

	// remote
	// const provider = new ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173");
	// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY__ROPSTEN, provider);
	// const contract = new ethers.Contract(process.env.LIBRARY_DEPLOYMENT_ROPSTEN, Library.abi, wallet);

	// // Create book
	// await libraryInteraction.createBook(contract, [91, "Second book"]);
	// const booksCount = await libraryInteraction.getBooksCount(contract);

	// // Get all books & available books
	// const allBooks = await libraryInteraction.getAllBooks(contract, booksCount);
	// const availableBooks = libraryInteraction.getAvailableBooks(allBooks);

	// // Transaction should be successful because there is available copy to borrow
	// const bookId = allBooks[0].id;
	// await libraryInteraction.borrowBook(contract, availableBooks, bookId);

	// /**
	//  * Checks availability
	//  * expected result: false
	//  */
	// let isAvailable = await libraryInteraction.isBookAvailable(contract, bookId);
	// console.log(`Is this book available: ${isAvailable}`);

	// /**
	//  * Checks if this book is borrowed by the current user
	//  * expected result: false
	//  */
	// let isBorrowedByUser = await libraryInteraction.isBookBorrowedByUser(contract, wallet, bookId);
	// console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowedByUser}\n`);

	// // This transaction shouldn't be successful because this book isn't available
	// await libraryInteraction.borrowBook(contract, availableBooks, bookId);

	// // Return book
	// await libraryInteraction.returnBook(contract, bookId);

	// /**
	//  * Checks availability
	//  * expected result: true
	//  */
	// isAvailable = await libraryInteraction.isBookAvailable(contract, bookId);
	// console.log(`Is this book available: ${isAvailable}`);

	// /**
	//  * Checks if this book is borrowed by the current user
	//  * expected result: true
	//  */
	// isBorrowedByUser = await libraryInteraction.isBookBorrowedByUser(contract, wallet, bookId);
	// console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowedByUser}\n`);
};

run();

module.exports = { run };