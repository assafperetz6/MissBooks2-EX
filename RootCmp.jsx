import { Home } from './cmps/Home.jsx'
import { AboutUs } from './cmps/AboutUs.jsx'
import { BookIndex } from './cmps/BookIndex.jsx'

const { useState } = React

export function App() {
    const [page, setPage] = useState('book')

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