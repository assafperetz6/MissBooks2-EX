const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ReviewList } from '../cmps/ReviewList.jsx'

export function BookDetails() {
	const [book, setBook] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [reviewToAdd, setReviewToAdd] = useState({})
	// const setBookDetail = createSetter(setBookToEdit)
	// const createSetter = setObject => key => value => setObject(object => ({...object, [key]: value }))

	const params = useParams()
	const navigate = useNavigate()

	let showModal = false

	useEffect(() => {
		loadBook()
	}, [book, showModal])

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
			.then(() => showSuccessMsg('Book removed successfully'))
			.then(onBack)
			.catch(err => {
				console.log('err:', err)
				showErrorMsg('Problems removing book')
			})
	}

	function onEditBook() {
		navigate(`/book/edit/${book.id}`)
	}

	function onAddReview() {
		setIsModalOpen(true)
	}

	function onSubmitReview(ev) {
		ev.preventDefault()
		
		bookService.saveReview(book.id, reviewToAdd)
			.then((review => {
				console.log(review)
				
				const reviews = [review, ...book.reviews]
				setBook(({ ...book, reviews }))
			}))
			.catch((err) => {
				console.log('Error: ', err);
				
				showErrorMsg('Review failed')
			})
			.finally(setIsModalOpen(false))
	}

	function onBack() {
		navigate('/book')
	}

	if (!book) return <div>Loading...</div>

	const {
		title,
		authors,
		publishedDate,
		description,
		pageCount,
		categories,
		thumbnail,
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
					<button onClick={() => onAddReview()}>Add Review</button>
					<button onClick={onBack}>Back</button>
				</section>

			</section>

			<dialog className={isModalOpen ? 'open' : ''}>
				<form method="dialog" className="flex justify-center flex-column space-between" onSubmit={onSubmitReview}>
					<label htmlFor="fullName">Full name</label>
					<input id="fullName" name="fullName" type="text" onChange={ev => setReviewToAdd(prev => ({...prev, fullName: ev.target.value}))} />
					
					<label htmlFor="rating">Rating</label>
					<input id="rating" name="rating" type="number" min="1" max="5" onChange={ev => setReviewToAdd(prev => ({...prev, rating: ev.target.value}))} />
					
					<label htmlFor="readAt">Read at:</label>
					<input id="readAt" name="readAt" type="date" onChange={ev => setReviewToAdd(prev => ({...prev, readAt: ev.target.value}))} />
					
					<label htmlFor="content">Write your review:</label>
					<input id="content" name="content" type="text" onChange={ev => setReviewToAdd(prev => ({...prev, content: ev.target.value}))} />

					<button onClick={() => setIsModalOpen(false)}>Close</button>
					<button>Submit</button>
				</form>
			</dialog>
			{book.reviews && <ReviewList reviews={book.reviews}/>}
		</article>
	)
}
