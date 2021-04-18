const createBook = async (contract) => {
	const testBook = [3, "first book"];

	const createBookTransactionReceipt = await contract.createBook(...testBook);
	const res = await createBookTransactionReceipt.wait();

	if (res.status != 1) {
		console.log("Transaction was not successful!");
		return;
	}

	console.log("Transaction successful!");
};

const borrowBook = async (contract, availableBooks) => {
	if (availableBooks.length > 0) {
		console.log(`Borrow: ${availableBooks[0].id}`);
		await contract.borrowBook(availableBooks[0].id);
	}
};

const returnBook = async (contract, bookId) => await contract.returnBook(bookId);

const getBooksCount = async (contract) => {
	const booksCount = await contract.viewAllBooksCount();
	console.log(`Books count ${booksCount}`);
	return booksCount;
};

const getAvailableBooks = (allBooks) => allBooks.filter(book => book.availableCopiesCount > 0);

const getAllBooks = async (contract, booksCount) => {
	const allBooks = [];
	let id;

	for (let i = 0; i < booksCount; i++) {
		id = await contract.allBookIDs(i);
		let { name, availableCopiesCount } = await contract.books(id);

		console.log(`Book id: ${id}`);
		console.log(`Book name: ${name}`);
		console.log(`Book copies: ${availableCopiesCount}`);

		allBooks.push({
			id,
			name,
			availableCopiesCount
		});
	}

	return allBooks;
};

const isBookAvailable = async (contract, bookId) => {
	const { availableCopiesCount } = await contract.books(bookId);
	console.log(parseInt(availableCopiesCount));

	return parseInt(availableCopiesCount) > 0;
};

const isBookBorrowedByUser = async (contract, wallet, bookId) => { 
	const bookClients = await contract.borrowedBooks(wallet.address);
	console.log(bookClients);
};

module.exports = {
	createBook,
	borrowBook,
	returnBook,
	getBooksCount,
	getAllBooks,
	getAvailableBooks,
	isBookAvailable,
	isBookBorrowedByUser
};