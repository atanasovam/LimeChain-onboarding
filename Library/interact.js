const libraryInteraction = require("./library-contract-interaction");

const run = async (contract, wallet) => {
	// Create book
	await libraryInteraction.createBook(contract, [1, "First book"]);
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

module.exports = { run };