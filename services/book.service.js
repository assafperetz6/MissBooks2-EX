import { getBooks } from '../books.js'
import { saveToStorage, loadFromStorage, makeId } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'BOOK_DB'
_createBooks()

export const bookService = {
	query,
	get,
	remove,
	save,
	getNewBook,
	getNextbookId,
	getDefaultFilter,
}

function query(filterBy = {}) {
	return storageService.query(BOOK_KEY).then((books) => {
		if (filterBy.title) {
			const regex = new RegExp(filterBy.title, 'i')
			books = books.filter((book) => regex.test(book.title))
		}
		if (filterBy.minPrice) {
			books = books.filter((book) => book.listPrice.amount >= filterBy.minPrice)
		}
		return books
	})
}

function get(bookId) {
	if (!bookId) return getNewBook()
	return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
	return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
	if (book.id) {
		return storageService.put(BOOK_KEY, book)
	} else {
		return storageService.post(BOOK_KEY, book)
	}
}

function getNewBook(title = 'Title', authors = ['Authors?']) {
	return { id: '',
		title,
		authors,
		publishedDate: '',
		description: 'Description',
		pageCount: '',
		categories: [],
		thumbnail: '',
		listPrice: {amount: 1}
	}
}

function getDefaultFilter() {
	return { title: '', minPrice: undefined }
}

function getNextbookId(bookId) {
	return storageService.query(BOOK_KEY).then((books) => {
		let nextbookIdx = books.findIndex((car) => car.id === bookId) + 1
		if (nextbookIdx === books.length) nextbookIdx = 0
		return books[nextbookIdx].id
	})
}

function _createBooks() {
	let books = loadFromStorage(BOOK_KEY)
	if (!books || !books.length) {
		books = getBooks()
		saveToStorage(BOOK_KEY, books)
	}
}

function _createBook(title, author) {
	const book = getNewBook(title, author)
	book.id = makeId()
	return book
}

function _setNextPrevBookId(book) {
	return query().then((books) => {
		const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
		const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
		const prevBook = books[bookIdx - 1]
			? books[bookIdx - 1]
			: books[books.length - 1]

		book.nextBook = nextBook.id
		book.prevBook = prevBook.id
		return book
	})
}
