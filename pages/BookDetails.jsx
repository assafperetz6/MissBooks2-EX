const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { BookEdit } from './BookEdit.jsx'

export function BookDetails() {
	const [book, setBook] = useState(null)
	// const setBookDetail = createSetter(setBookToEdit)
	// const createSetter = setObject => key => value => setObject(object => ({...object, [key]: value }))

	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		loadBook()
	}, [book])

	function loadBook() {
		bookService
			.get(params.bookId)
			.then(setBook)
			.catch((err) => console.error('err:', err))
	}

	function setReadingLevel(pageCount) {
		if (pageCount >= 500) return 'Serious Reading'
		if (pageCount >= 200) return 'Decent Reading'
		if (pageCount < 100) return 'Light Reading'
	}

	function isOldNew(publishedDate) {
		const currDate = new Date()

		if (currDate.getFullYear() - publishedDate <= 1) return 'New'
		if (currDate.getFullYear() - publishedDate > 10) return 'Vintage'
	}

	function isCheapExpensive(price) {
		if (price > 150) return 'expensive'
		if (price < 20) return 'cheap'
	}

	function onRemoveBook(ev, bookId = book.id) {		
		bookService
			.remove(bookId)
			.then(onBack)
			.catch((err) => console.log('err:', err))
	}

	function onEditBook() {
		navigate(`/book/edit/${book.id}`)
	}

	function onBack() {
		navigate('/book')
	}

	if (!book) return <div>Loading...</div>

	const {
		title,
		subtitle,
		authors,
		publishedDate,
		description,
		pageCount,
		categories,
		thumbnail,
		language,
		listPrice,
	} = book
	

	return (
		<article className="book-details">
			<h2 className="full">{title}</h2>
			<img className="full" src={thumbnail} alt="book-img" />
			<p>{description}</p>
			<ul>
				<li>
					<span className="bold">Price:</span>{' '}
					<span className={isCheapExpensive(listPrice.amount)}>
						{listPrice.amount} {listPrice.currencyCode}
					</span>
				</li>
				<li>
					<span className="bold">Written by:</span> {authors.join(', ')}
				</li>
				<li>
					<span className="bold">Published:</span> {publishedDate}{' '}
					<span>{isOldNew(publishedDate)}</span>
				</li>
				<li>
					<span className="bold">Page count:</span>{' '}
					<span>
						{pageCount} - {setReadingLevel(pageCount)}
					</span>
				</li>
				<li>
					<span className="bold">Categories:</span> {categories.join(', ')}
				</li>
			</ul>
			<section className="actions full">
				<section className="nav-btn">
					<button><Link to={`/book/${book.prevBook}`}>Previous Book</Link></button>
					<button><Link to={`/book/${book.nextBook}`}>Next Book</Link></button>
				</section>
				<section>
					<button onClick={onRemoveBook}>Delete</button>
					<button onClick={onEditBook}>Edit</button>
					<button onClick={onBack}>Back</button>
				</section>
			</section>
		</article>
	)
}
