import { getBooks } from '../books.js'
import { saveToStorage, loadFromStorage, makeId } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'BOOK_DB'
var gFilterBy = { txt: '', price: 0 }
_createBooks()

export const bookservice = {
    query,
    get,
    remove,
    save,
    getNewBook,
    getNextbookId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.price) {
                books = books.filter(book => book.listPrice.amount >= gFilterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
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

function getNewBook(title = '', author = '') {
    return { id: '', title, author }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
    return gFilterBy
}

function getNextbookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextbookIdx = books.findIndex(car => car.id === bookId) + 1
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