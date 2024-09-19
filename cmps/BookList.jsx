import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
	return (
		<section className="book-list-container flex">
			<ul className="book-list clean-list">
				{books.map((book, idx) => (
					<BookPreview book={book} idx={idx} key={book.id} onRemoveBook={onRemoveBook}/>
				))}
			</ul>
		</section>
	)
}
