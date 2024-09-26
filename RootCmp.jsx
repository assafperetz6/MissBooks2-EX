import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

const { useState } = React

export function App() {
    const [page, setPage] = useState('about')

    function selectPage(pageName) {
        setPage(pageName)
    }

    return (
        <section className="app">
            <header className="app-header">
                <h1>My App</h1>
                <ul className="main-nav clean-list flex">
                    <li onClick={() => selectPage('home')}>Home</li>
                    <li onClick={() => selectPage('about')}>About Us</li>
                    <li onClick={() => selectPage('book')}>Books</li>
                </ul>

            </header>
            <main className="container">
                { page === 'home' && <Home />}
                { page === 'about' && <AboutUs />}
                { page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}