const { Link } = ReactRouterDOM

import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
	return (
		<section className="book-list-container">
			{books.length ? (
				<ul className="book-list clean-list">
					{books.map((book) => (
						<li className={`book ${book.listPrice.isOnSale ? 'on-sale' : ''}`} onClick={() => console.log(book.id)} key={book.id}>
							<BookPreview
								book={book}
								onRemoveBook={onRemoveBook}
							/>
						</li>
					))}
				</ul>
			) : (
				<h2>No books were found...</h2>
			)}
		</section>
	)
}
