import { Input, ArrayInput } from './Inputs.jsx'

const { useState, useEffect } = React

export function BookFilter({ filterBy, setFilterBy }) {
	const { title, minPrice } = filterBy

	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		setFilterBy(prev => ({...prev, ...filterByToEdit}))
	}, [filterByToEdit])
	
	
	return (
		<section className="filter-container">
			<h2>Sort & Filter</h2>

			<label>
				Title
				<Input value={title} onChange={value => setFilterByToEdit(prevFilter => ({...prevFilter, title: value}))}/>
			</label>
			<label>
				Min-Price
				<Input type={'number'} value={minPrice > 0 ? minPrice : ''} onChange={value => setFilterByToEdit(prevFilter => ({...prevFilter, minPrice: +value}))}/>
			</label>
		</section>
	)
}
