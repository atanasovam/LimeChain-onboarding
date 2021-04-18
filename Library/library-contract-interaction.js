const libraryContract = (() => {
	const createBook = async (contract, bookParams) => {
		const createBookTransactionReceipt = await contract.createBook(...bookParams);
		const response = await createBookTransactionReceipt.wait();

		if (response.status != 1) {
			console.log("Transaction was not successful!");
			return;
		}

		console.log("Transaction successful!");
	};

	const borrowBook = async (contract, availableBooks, bookId) => {
		console.log(`Borrowing book with id: ${bookId}...`);
		if (availableBooks.length === 0) {
			console.log(`Cannot borrow book with id: ${bookId}- no available copies!`);
			return;
		}

		try {
			const borrowBookTransactionReceipt = await contract.borrowBook(bookId);
			await borrowBookTransactionReceipt.wait();
			console.log("Transaction was successful!\n");
		} catch (response) {
			if (response.status != 1) {
				console.log("Transaction was not successful!\n");
			}
		}
	};

	const returnBook = async (contract, bookId) => await contract.returnBook(bookId);

	const getBooksCount = async (contract) => {
		const booksCount = await contract.viewAllBooksCount();
		console.log(`Books count: ${booksCount}`);
		return booksCount;
	};

	const getAvailableBooks = (allBooks) => allBooks.filter(book => book.availableCopiesCount > 0);

	const getAllBooks = async (contract, booksCount) => {
		const allBooks = [];
		let book, id;

		for (let i = 0; i < booksCount; i++) {
			id = await contract.allBookIDs(i);
			let { name, availableCopiesCount } = await contract.books(id);

			book = {
				id,
				name,
				availableCopiesCount: parseInt(availableCopiesCount)
			};
			
			console.table([book]);
			allBooks.push(book);
		}

		return allBooks;
	};

	const isBookAvailable = async (contract, bookId) => {
		const { availableCopiesCount } = await contract.books(bookId);
		return parseInt(availableCopiesCount) > 0;
	};

	const isBookBorrowedByUser = async (contract, wallet, bookId) => await contract.borrowedBooks(wallet.address, bookId);

	return {
		createBook,
		borrowBook,
		returnBook,
		getBooksCount,
		getAllBooks,
		getAvailableBooks,
		isBookAvailable,
		isBookBorrowedByUser
	};
})();

module.exports = libraryContract;