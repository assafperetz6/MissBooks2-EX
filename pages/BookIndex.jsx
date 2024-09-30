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

	if (!books) return <div>Loading...</div>

	return (
		<section className="book-index">
			<BookFilter filterBy={filterBy} setFilterBy={setFilterBy}/>
			<section>
				<button>
					<Link to="/book/edit">Add new book</Link>
				</button>
			</section>
			<BookList books={books} />
		</section>
	)
}
