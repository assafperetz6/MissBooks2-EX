export function BookList({ books }) {
    console.log(books);
    
    const bookList = books.map(({id, title, authors, listPrice}) => {
        return (
            <li key={id}>
                <h2>{title}</h2>
                <h3>By {authors}</h3>
                <h3>{listPrice.amount} EUR</h3>
            </li>
        )
    })
    
	return (
		<section className="book-list flex">
			<ul>{bookList}</ul>
		</section>
	)
}
