import { Input, ArrayInput } from '../cmps/Inputs.jsx'

export function BookFilter({}) {
	return (
		<section className="Filter">
            < Input value=''/>
			<input name="title" type="text" />
			<input name="price" type="number" />
		</section>
	)
}
