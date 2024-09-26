import { bookService } from '../services/book.service.js'
import { Input, ArrayInput } from '../cmps/Inputs.jsx'

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack, onRemoveBook }) {
	const [isEdit, setIsEdit] = useState(false)

	const [book, setBook] = useState(null)
	// const setBookDetail = createSetter(setBookToEdit)

	// const createSetter = setObject => key => value => setObject(object => ({...object, [key]: value }))

	useEffect(() => {
		loadBook()
	}, [])

	// function onUpdateBook() {
	//     setBookToEdit(bookId)
	//     setIsEdit(true)
	// }

	function loadBook() {
		bookService
			.get(bookId)
			.then(setBook)
			.catch((err) => console.error('err:', err))
	}

	// function onSaveBook(ev, bookToEdit) {
	//     ev.preventDefault()

	//     bookService.save(bookToEdit)
	//         .then(() => {
	//             setIsEdit(false)
	//             setBookToEdit(null)
	//             onSelectBook(bookToEdit.id)
	//         })
	//         .catch(err => {
	//             console.log('Had issues with book save:', err)
	//         })
	// }

	// function handleOnChange({ target }) {
	//     const { name: field, type } = target
	//     let { value } = target

	// 	console.log(field, type, value)

	//     switch (type) {
	//         case 'number':
	//         case 'range':
	//             value = +value
	//             break;

	//         case 'checkbox':
	//             value = target.checked
	//             break
	//     }

	//     if (field === 'listPrice') setBookToEdit(book => ({...book, listPrice: {...listPrice, amount: value}}))
	// 	else if (field === 'authors') setBookToEdit(book => ({...book, authors: value.split(',')}))
	//     else setBookToEdit(book => ({...book, [field]: value}))
	// }

	if (!book) return <div>Loading...</div>

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
			<h2 className="full">{title}</h2>
			<img className="full" src={thumbnail} alt="book-img" />
			<p>{description}</p>
			<ul>
				<li>
					<span className="bold">Price:</span> {listPrice.amount}{' '}
					{listPrice.currencyCode}
				</li>
				<li>
					<span className="bold">Written by:</span> {authors}
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
				<button onClick={() => onRemoveBook(bookId)}>Delete</button>
				<button onClick={() => onUpdateBook(bookId)}>Edit</button>
				<button onClick={onBack}>Back</button>
			</section>

			{/* <dialog className={isEdit ? 'edit' : ''}>
				<form
					method="dialog"
					onSubmit={(Event) => onSaveBook(Event, bookToEdit)}
				>
					<input onChange={handleOnChange} type="text" name="title" placeholder={title}/>
					<input
						onChange={handleOnChange}
						type="text"
						name="authors"
						placeholder={authors}
					/>
					<input
						onChange={handleOnChange}
						type="number"
						name="listPrice"
						placeholder={listPrice.amount}
					/>
					<input
						onChange={handleOnChange}
						type="text"
						name="publishedDate"
						placeholder={publishedDate}
					/>

					<Input
						type="number"
						value={listPrice.amount}
						onChange={(value) => setBookToEdit((book) => ({...book, listPrice: { ...book.listPrice, amount: +value }}))}
					/>
					<ArrayInput value={authors} onChange={setBookDetail('authors')} />
					<button>Save</button>
				</form>
			</dialog> */}
		</article>
	)
}
