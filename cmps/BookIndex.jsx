import { bookservice } from '../services/book.service.js'
import { storageService } from '../services/async-storage.service.js'
import { BookList } from './BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {
	const [books, setBooks] = useState(null)

	useEffect(() => {
		bookservice.query().then(setBooks)
	}, [])

	if (!books) return <div>Loading...</div>
	return (
        <BookList books={books}/>
	)
}
