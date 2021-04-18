const libraryContract = require("./library-contract-interaction");

const run = async (contract, wallet) => {
	// Create book
	await libraryContract.createBook(contract, [1, "First book"]);
	const booksCount = await libraryContract.getBooksCount(contract);

	// Get all books & available books
	const allBooks = await libraryContract.getAllBooks(contract, booksCount);
	const availableBooks = libraryContract.getAvailableBooks(allBooks);

	// Transaction should be successful because there is available copy to borrow
	const bookId = allBooks[0].id;
	await libraryContract.borrowBook(contract, availableBooks, bookId);
	
	/**
	 * Checks availability
	 * expected result: false
	 */
	let isAvailable = await libraryContract.isBookAvailable(contract, bookId);
	console.log(`Is this book available: ${isAvailable}`);

	/**
	 * Checks if this book is borrowed by the current user
	 * expected result: false
	 */
	let isBorrowedByUser = await libraryContract.isBookBorrowedByUser(contract, wallet, bookId);
	console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowedByUser}\n`);
	
	// This transaction shouldn't be successful because this book isn't available
	await libraryContract.borrowBook(contract, availableBooks, bookId);

	// Return book
	await libraryContract.returnBook(contract, bookId);
	
	/**
	 * Checks availability
	 * expected result: true
	 */
	isAvailable = await libraryContract.isBookAvailable(contract, bookId);
	console.log(`Is this book available: ${isAvailable}`);

	/**
	 * Checks if this book is borrowed by the current user
	 * expected result: true
	 */
	isBorrowedByUser = await libraryContract.isBookBorrowedByUser(contract, wallet, bookId);
	console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowedByUser}\n`);
};

module.exports = { run };