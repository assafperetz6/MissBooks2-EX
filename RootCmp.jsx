const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { Team } from './cmps/Team.jsx'
import { Vision } from './cmps/Vision.jsx'


export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="container">
                    <Routes>
                       <Route path="/" element={<Navigate to="/home" />} />
                       <Route path="/home" element={<Home />} />
                       <Route path="/about" element={<AboutUs />} >
                            <Route path="/about/team" element={<Team />}/>
                            <Route path="/about/vision" element={<Vision />}/>
                       </Route>
                       <Route path="/book" element={<BookIndex />} />
                       <Route path="/book/:bookId" element={<BookDetails />} />
                       <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}