const interact = require("./contract-interact-functions");

const run = async function (contract, wallet) {
	// Create book
	await interact.createBook(contract, [1, "First book"]);
	const booksCount = await interact.getBooksCount(contract);

	// Get all books & available books
	const allBooks = await interact.getAllBooks(contract, booksCount);
	const availableBooks = interact.getAvailableBooks(allBooks);

	// Transaction should be successful because there is available copy to borrow
	const bookId = allBooks[0].id;
	await interact.borrowBook(contract, availableBooks, bookId);
	
	/**
	 * Checks availability
	 * expected result: false
	 */
	let isAvailable = await interact.isBookAvailable(contract, bookId);
	console.log(`Is this book available: ${isAvailable}`);

	/**
	 * Checks if this book is borrowed by the current user
	 * expected result: false
	 */
	let isBorrowedByUser = await interact.isBookBorrowedByUser(contract, wallet, bookId);
	console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowedByUser}\n`);
	
	// This transaction shouldn't be successful because this book isn't available
	await interact.borrowBook(contract, availableBooks, bookId);

	// Return book
	await interact.returnBook(contract, bookId);
	
	/**
	 * Checks availability
	 * expected result: true
	 */
	isAvailable = await interact.isBookAvailable(contract, bookId);
	console.log(`Is this book available: ${isAvailable}`);

	/**
	 * Checks if this book is borrowed by the current user
	 * expected result: true
	 */
	isBorrowedByUser = await interact.isBookBorrowedByUser(contract, wallet, bookId);
	console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowedByUser}\n`);
};

module.exports = { run };