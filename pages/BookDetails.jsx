import { bookService } from '../services/book.service.js'
import { Input, ArrayInput } from '../cmps/Inputs.jsx'

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack, onRemoveBook }) {
	const [isEdit, setIsEdit] = useState(false)

	const [book, setBook] = useState(null)
	// const setBookDetail = createSetter(setBookToEdit)

	// const createSetter = setObject => key => value => setObject(object => ({...object, [key]: value }))

	useEffect(() => {
		loadBook()
	}, [])

	// function onUpdateBook() {
	//     setBookToEdit(bookId)
	//     setIsEdit(true)
	// }

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

	// function onSaveBook(ev, bookToEdit) {
	//     ev.preventDefault()

	//     bookService.save(bookToEdit)
	//         .then(() => {
	//             setIsEdit(false)
	//             setBookToEdit(null)
	//             onSelectBook(bookToEdit.id)
	//         })
	//         .catch(err => {
	//             console.log('Had issues with book save:', err)
	//         })
	// }

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
					<span className="bold">Price:</span> {listPrice.amount}{' '}
					{listPrice.currencyCode}
				</li>
				<li>
					<span className="bold">Written by:</span> {authors}
				</li>
				<li>
					<span className="bold">Published:</span> {publishedDate}
				</li>
				<li>
					<span className="bold">Page count:</span> <span>{pageCount} - {setReadingLevel(pageCount)}</span>
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
