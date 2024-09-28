import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, onSelectBook }) {
	return (
		<section className="book-list-container">
			<ul className="book-list clean-list">
				{books.map((book, idx) => (
					<BookPreview
						book={book}
						idx={idx}
						key={book.id}
						onRemoveBook={onRemoveBook}
						onSelectBook={onSelectBook}
					/>
				))}
			</ul>
		</section>
	)
}
