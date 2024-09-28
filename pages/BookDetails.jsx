import { bookService } from '../services/book.service.js'
import { BookEdit } from '../cmps/BookEdit.jsx'

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack, onRemoveBook }) {
	const [isEdit, setIsEdit] = useState(false)

	const [book, setBook] = useState(null)
	// const setBookDetail = createSetter(setBookToEdit)

	// const createSetter = setObject => key => value => setObject(object => ({...object, [key]: value }))

	useEffect(() => {
		loadBook()
	}, [isEdit])

	function loadBook() {
		bookService
			.get(bookId)
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

	function onUpdateBook() {
	    setIsEdit(true)
	}

	function onCancelEdit() {
		setIsEdit(false)
	}

	function saveBook(bookToEdit) {
	    bookService.save(bookToEdit)
	        .then(() => {
	            setIsEdit(false)
	        })
	        .catch(err => {
	            console.log('Had issues with book save:', err)
	        })
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
		isEdit ? <BookEdit book={book} saveBook={saveBook} />
		: <article className="book-details">
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
			<section className="book-actions full">
				<button onClick={() => onRemoveBook(bookId)}>Delete</button>
				<button onClick={() => onUpdateBook(bookId)}>Edit</button>
				<button onClick={onBack}>Back</button>
			</section>
		</article>
	)
}
