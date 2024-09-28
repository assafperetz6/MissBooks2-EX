import { bookService } from '../services/book.service.js'
import { Input, ArrayInput } from '../cmps/Inputs.jsx'

const { useState, useEffect } = React

export function BookEdit({ book, saveBook, onCancelEdit }) {
	const [bookToEdit, setBookToEdit] = useState(book)

	// useEffect(() => {

	// }, [bookToEdit])

	// function loadBook() {
	// 	bookService
	// 		.get(bookId)
	// 		.then(setBookToEdit)
	// 		.catch((err) => console.error('err:', err))
	// }

	function onSaveBook(bookToEdit) {
		saveBook(bookToEdit)
	}

	if (!bookToEdit) return <div>Loading...</div>

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
					<span>
						{listPrice.amount} {listPrice.currencyCode}
					</span>
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
				<button onClick={() => (onCancelEdit = { onCancelEdit })}>Back</button>
				<button onClick={() => onSaveBook(bookToEdit)}>Save</button>
			</section>
		</article>
	)
}
