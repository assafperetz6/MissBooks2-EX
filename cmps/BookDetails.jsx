export function BookDetails({ book }) {
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
	} = book

    return (
        <article className="book-details">
            <h2>{title}</h2>
            <img src={thumbnail} alt="book-img"/>
            <p>{description}</p>
            <ul>
                <li><span className="bold">Price:</span> {listPrice.amount} {listPrice.currencyCode}</li>
                <li><span className="bold">Written by:</span> {authors.join(', ')}</li>
                <li><span className="bold">Published:</span> {publishedDate}</li>
                <li><span className="bold">Page count:</span> {pageCount}</li>
                <li><span className="bold">Categories:</span> {categories.join(', ')}</li>
            </ul>
        </article>
    )
}
