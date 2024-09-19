import { bookservice } from '../services/book.service.js'
import { BookList } from './BookList.jsx'
import { BookDetails } from './BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {
	const [books, setBooks] = useState(null)
	const [selectedBook, setSelectedBook] = useState(null)

	useEffect(() => {
		bookservice.query().then(setBooks)
	}, [])

	function onSelectBook(bookId) {
		bookservice.get(bookId).then(setSelectedBook)
	}

	function onRemoveBook(bookId) {
		bookservice
			.remove(bookId)
			.then(setBooks((books) => books.filter((book) => book.id !== bookId)))
	}

    if (selectedBook) return <BookDetails book={selectedBook}/>
	if (!books) return <div>Loading...</div>
	return <BookList books={books} onRemoveBook={onRemoveBook} onSelectBook={onSelectBook} />
}
