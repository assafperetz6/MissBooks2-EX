export function BookPreview({ book, idx, onRemoveBook }) {
    return (           
    <li className="book">
        <h2 className="full">{book.title}</h2>
        <img className="full" src={`../assets/img/${idx + 1}.jpg`} alt="" />
        <h3>By {book.authors}</h3>
        <h3>{book.listPrice.amount} EUR</h3>
        <section className="book-actions">
            <button onClick={() => onRemoveBook(book.id)}>Remove</button>
            <button>Edit</button>
        </section>
    </li>
    )
}