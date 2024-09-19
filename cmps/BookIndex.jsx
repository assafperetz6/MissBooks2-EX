import { bookservice } from '../services/book.service.js'
import { BookList } from './BookList.jsx'
import { BookDetails } from './BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {
	const [books, setBooks] = useState(null)
	const [selectedBook, setSelectedBook] = useState(null)

	useEffect(() => {
		bookservice
			.query()
			.then(setBooks)
			.catch((err) => console.log('err:', err))
	}, [])

	function onSelectBook(bookId) {
		bookservice
			.get(bookId)
			.then(setSelectedBook)
			.catch((err) => console.log('err:', err))
	}

	function onBack() {
		setSelectedBook(null)
	}

	function onRemoveBook(bookId) {
		bookservice
			.remove(bookId)
			.then(setBooks((books) => books.filter((book) => book.id !== bookId)))
			.catch((err) => console.log('err:', err))

		onBack()
	}

	function updateBook(book) {
		save(book).then(book =>
			setBooks(prev => (
                [...prev.filter((prevBook) => prevBook.id !== book), book])
            )
		)
	}

	if (selectedBook)
		return (
			<BookDetails
				book={selectedBook}
				onBack={onBack}
				onRemoveBook={onRemoveBook}
                updateBook={updateBook}
			/>
		)
	if (!books) return <div>Loading...</div>
	return <BookList books={books} onSelectBook={onSelectBook} />
}
