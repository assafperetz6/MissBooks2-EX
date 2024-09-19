export function BookPreview({ book, idx, onSelectBook }) {
    return (           
    <li className="book" onClick={() => onSelectBook(book.id)}>
        <h2 className="full">{book.title}</h2>
        <img className="full" src={book.thumbnail} alt="" />
        <h3>By {book.authors}</h3>
        <h3>{book.listPrice.amount} EUR</h3>
    </li>
    )
}