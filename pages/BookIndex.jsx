const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'


export function BookIndex() {
	const [books, setBooks] = useState(null)
	const [selectedBookId, setSelectedBookId] = useState(null)
	const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

	useEffect(() => {
		loadBook()
	}, [filterBy])

	function loadBook() {
		bookService
			.query(filterBy)
			.then(setBooks)
			.catch((err) => console.log('err:', err))
	}

	function onSelectBook(bookId) {
		setSelectedBookId(bookId)
	}

	function onBack() {
		setSelectedBookId(null)
	}

	function onRemoveBook(bookId) {
		bookService
			.remove(bookId)
			.then(setBooks((books) => books.filter((book) => book.id !== bookId)))
			.then(onBack)
			.catch((err) => console.log('err:', err))
	}

	if (!books) return <div>Loading...</div>

	return (
		<section className="book-index">
			<BookFilter filterBy={filterBy} setFilterBy={setFilterBy}/>
			<BookList books={books} />
		</section>
	)
}
