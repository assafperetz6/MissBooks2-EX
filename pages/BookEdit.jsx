const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { Input, ArrayInput } from '../cmps/Inputs.jsx'

export function BookEdit({ saveBook }) {
	const [bookToEdit, setBookToEdit] = useState(bookService.getNewBook())
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if(params.bookId) loadBook()
	}, [])

	function loadBook() {
		bookService.get(params.bookId)
			.then(setBookToEdit)
			.catch((err) => console.error('err:', err))
	}

	function saveBook(bookToEdit) {
	    bookService.save(bookToEdit)
	        .then(() => {
				showSuccessMsg('Book was edited!')
				navigate(`/book/${bookToEdit.id}`)
	        })
	        .catch(err => {
				showErrorMsg('Problems saving changes')
	            console.log('Had issues with book save:', err)
	        })
	}

	if (!bookToEdit) return <div>Loading...</div>

	const {
		title,
		authors,
		publishedDate,
		description,
		pageCount,
		categories,
		thumbnail,
		listPrice,
	} = bookToEdit

		return (
			<article className="book-details">
				<h2 className="full">
					Title:{' '}
					<Input
						value={title}
						onChange={(value) =>
							setBookToEdit((book) => ({ ...book, title: value }))
						}
					/>
				</h2>
				<img className="full" src={thumbnail} alt="book-img" />
				<p>
					<Input
						value={description}
						onChange={(value) =>
							setBookToEdit((book) => ({ ...book, description: value }))
						}
					/>
				</p>
				<ul>
					<li>
						<span className="bold">
							Price:
							<Input
								type="number"
								value={listPrice.amount}
								onChange={(value) =>
									setBookToEdit((book) => ({
										...book,
										listPrice: { ...listPrice, amount: value },
									}))
								}
							/>
						</span>
						<span>{listPrice.currencyCode}</span>
					</li>
					<li>
						<span className="bold">
							Written by:{' '}
							<ArrayInput
								value={authors}
								onChange={(value) =>
									setBookToEdit((book) => ({
										...book,
										authors: value.split(', '),
									}))
								}
							/>
						</span>
					</li>
					<li>
						<span className="bold">
							Published:{' '}
							<Input
								type="number"
								value={publishedDate}
								onChange={(value) =>
									setBookToEdit((book) => ({ ...book, publishedDate: value }))
								}
							/>
						</span>
					</li>
					<li>
						<span className="bold">
							Page count:{' '}
							<Input
								type="number"
								value={pageCount}
								onChange={(value) =>
									setBookToEdit((book) => ({ ...book, pageCount: value }))
								}
							/>
						</span>
					</li>
					<li>
						<span className="bold">
							Categories:{' '}
							<ArrayInput
								value={categories}
								onChange={(value) =>
									setBookToEdit((book) => ({
										...book,
										categories: value.split(', '),
									}))
								}
							/>
						</span>
					</li>
				</ul>
				<section className="book-actions full">
					<button><Link to={`/book/${bookToEdit.id}`}>Cancel</Link>
					</button>
					<button onClick={() => saveBook(bookToEdit)}>Save</button>
				</section>
			</article>
		)
}
