const { useState, useEffect } = React

export function BookDetails({ book, onBack, onRemoveBook, updateBook }) {
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

    const [isEditOn, setIsEditOn] = useState(false)
    const [currBook, setBook] = useState(book)
    
    useEffect(() => {
    }, [onUpdateBook])
    
    function onUpdateBook(book) {
        setIsEditOn(true)
        
        let updatedBook = {...book, }
        

    }

	return (
		<article className="book-details">
			<h2 className="full">{title}</h2>
			<img className="full" src={thumbnail} alt="book-img" />
			<p>{description}</p>
			<ul>
				<li>
					<span className="bold">Price:</span> {listPrice.amount}{' '}
					{listPrice.currencyCode}
				</li>
				<li>
					<span className="bold">Written by:</span> {authors.join(', ')}
				</li>
				<li>
					<span className="bold">Published:</span> {publishedDate}
				</li>
				<li>
					<span className="bold">Page count:</span> {pageCount}
				</li>
				<li>
					<span className="bold">Categories:</span> {categories.join(', ')}
				</li>
			</ul>
			<section className="book-actions full">
				<button onClick={() => onRemoveBook(book.id)}>Delete</button>
				<button onClick={() => onUpdateBook(book)}>Edit</button>
				<button onClick={onBack}>Back</button>
			</section>

			<dialog className={isEditOn ? 'edit' : ''}>
				<form method="dialog">
					<input type="text" name="title" placeholder={title}/>
					<input type="text" name="author" placeholder={authors}/>
					<input type="number" name="price" placeholder={listPrice.amount}/>
					<input type="text" name="publish-date" placeholder={publishedDate}/>
				</form>
			</dialog>
		</article>
	)
}
