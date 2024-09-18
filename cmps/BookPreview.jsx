export function BookPreview({ book }) {
    return (           
    <li>
        <h2>{book.title}</h2>
        <h3>By {book.authors}</h3>
        <h3>{book.listPrice.amount} EUR</h3>
    </li>
    )
}