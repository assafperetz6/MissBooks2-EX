export function BookPreview({ book }) {
	return (
		<React.Fragment>
			<h2 className="full">{book.title}</h2>
			<img className="full" src={book.thumbnail} alt="" />
			<h3>By {book.authors}</h3>
			<h3>{book.listPrice.amount} EUR</h3>
		</React.Fragment>
	)
}
