import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ book, onBack, onRemoveBook, onSelectBook }) {
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

    const [bookToEdit, setBookToEdit] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    
    useEffect(() => {
    }, [onSaveBook])

    function onUpdateBook() {
        setBookToEdit(book)
        setIsEdit(true)
    }

    function onSaveBook(ev, bookToEdit) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(() => {
                setIsEdit(false)
                setBookToEdit(null)
                onSelectBook(bookToEdit.id)
            })
            .catch(err => {
                console.log('Had issues with book save:', err)
            })
    }

    function handleOnChange({ target }) {
        const { name: field, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        
        if (type === 'number') setBookToEdit(book => ({...book, listPrice: {...listPrice, amount: value}}))
        else setBookToEdit(book => ({...book, [field]: value}))
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
				<button onClick={() => onUpdateBook(book.id)}>Edit</button>
				<button onClick={onBack}>Back</button>
			</section>

			<dialog className={isEdit ? 'edit' : ''}>
				<form method="dialog" onSubmit={(Event) => onSaveBook(Event, bookToEdit)}>
					<input onChange={handleOnChange} type="text" name="title" placeholder={title}/>
					<input onChange={handleOnChange} type="text" name="authors" placeholder={authors}/>
					<input onChange={handleOnChange} type="number" name="listPrice" placeholder={listPrice.amount}/>
					<input onChange={handleOnChange} type="text" name="publishedDate" placeholder={publishedDate}/>
                    <button>Save</button>
				</form>
			</dialog>
		</article>
	)
}
