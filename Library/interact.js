import * as interact from "./contract-interact-functions";

const run = async function (contract, wallet) {
	await interact.createBook(contract, [3, "first book"]);
	const booksCount = await interact.getBooksCount(contract);

	const allBooks = await interact.getAllBooks(contract, booksCount);
	const availableBooks = interact.getAvailableBooks(allBooks);

	const bookId = allBooks[0].id;
	await interact.borrowBook(contract, availableBooks, bookId);
	let isAvailable = await interact.isBookAvailable(contract, bookId);
	console.log(`Is this book available: ${isAvailable}`);

	await interact.returnBook(contract, bookId);
	isAvailable = await interact.isBookAvailable(contract, bookId);
	console.log(`Is this book available: ${isAvailable}`);

	const isBorrowed = await interact.isBookBorrowedByUser(contract, wallet, bookId);
	console.log(`Is this book borrowed by ${wallet.address}: ${isBorrowed}`);
};

module.exports = { run };