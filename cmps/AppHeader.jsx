const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
	return (
		<header className="app-header">
			<h1>My App</h1>
			<nav className="main-nav clean-list flex">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About us</NavLink>
                <NavLink to="/book">Books</NavLink>
			</nav>
		</header>
	)
}
