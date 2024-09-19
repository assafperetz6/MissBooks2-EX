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
        </article>
    )
}
