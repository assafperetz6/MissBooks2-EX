import { bookService } from '../services/book.service.js'
import { BookList } from './BookList.jsx'
import { BookDetails } from './BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {
	const [books, setBooks] = useState(null)
	const [selectedBook, setSelectedBook] = useState(null)

	useEffect(() => {
		bookService
			.query()
			.then(setBooks)
			.catch((err) => console.log('err:', err))
	}, [])

	function onSelectBook(bookId) {
		bookService
			.get(bookId)
			.then(setSelectedBook)
			.catch((err) => console.log('err:', err))
	}

	function onBack() {
		setSelectedBook(null)
	}

	function onRemoveBook(bookId) {
		bookService
			.remove(bookId)
			.then(setBooks((books) => books.filter((book) => book.id !== bookId)))
			.catch((err) => console.log('err:', err))

		onBack()
	}

	if (selectedBook)
		return (
			<BookDetails
				book={selectedBook}
				onBack={onBack}
				onRemoveBook={onRemoveBook}
                onSelectBook={onSelectBook}
			/>
		)
	if (!books) return <div>Loading...</div>
	return <BookList books={books} onSelectBook={onSelectBook} />
}
