const { ethers } = require("ethers");
const dotenv = require('dotenv');

const libraryInteraction = require("./library-contract-interaction");
const Library = require("./build/Library.json");

const run = async () => {
	dotenv.config();

	// local
	// const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
	// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_LOCAL, provider);
	// const contract = new ethers.Contract(process.env.LIBRARY_DEPLOYMENT_LOCAL, Library.abi, wallet);

	// remote
	const provider = new ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173")
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY__ROPSTEN, provider);
	const contract = new ethers.Contract(process.env.LIBRARY_DEPLOYMENT_ROPSTEN, Library.abi, wallet);

	// Create book
	await libraryInteraction.createBook(contract, [1, "13 book"]);
	const booksCount = await libraryInteraction.getBooksCount(contract);

	// Get all books & available books
	const allBooks = await libraryInteraction.getAllBooks(contract, booksCount);
	const availableBooks = libraryInteraction.getAvailableBooks(allBooks);

	// Transaction should be successful because there is available copy to borrow
	const bookId = allBooks[0].id;
	await libraryInteraction.borrowBook(contract, availableBooks, bookId);

	/**
	 * Checks availability
	 * expected result: false
	 */
	let isAvailable = await libraryInteraction.isBookAvailable(contract, bookId);
	console.log(`Is this book available: ${isAvailable}`);

	/**
	 * Checks if this book is borrowed by the current user
	 * expected result: false
	 */
	let isBorrowedByUser = await libraryInteraction.isBookBorrowedByUser(contract, wallet, bookId);
	console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowedByUser}\n`);

	// This transaction shouldn't be successful because this book isn't available
	await libraryInteraction.borrowBook(contract, availableBooks, bookId);

	// Return book
	await libraryInteraction.returnBook(contract, bookId);

	/**
	 * Checks availability
	 * expected result: true
	 */
	isAvailable = await libraryInteraction.isBookAvailable(contract, bookId);
	console.log(`Is this book available: ${isAvailable}`);

	/**
	 * Checks if this book is borrowed by the current user
	 * expected result: true
	 */
	isBorrowedByUser = await libraryInteraction.isBookBorrowedByUser(contract, wallet, bookId);
	console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowedByUser}\n`);
};

run();

module.exports = { run };