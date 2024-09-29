const { Link } = ReactRouterDOM

export function Vision() {
	return (
		<section className="vision">
			<h2>Our Vision</h2>
			<p>
				At <span className="bold">MissBooks</span>, our vision is to create a
				sanctuary for book lovers, where the magic of stories comes to life and
				the joy of reading is celebrated every day. We believe in the
				transformative power of books to inspire, educate, and connect people
				from all walks of life.
			</p>

			<p>
				Our goal is to cultivate a welcoming and inclusive environment where
				everyone feels at home. Whether you’re searching for the latest
				bestseller, a timeless classic, or a hidden gem, our knowledgeable and
				passionate team is here to guide you on your literary journey.
			</p>

			<p>
				We are committed to supporting our local community through engaging
				events, author signings, and book clubs that foster a love for reading
				and lifelong learning. At MissBooks, we strive to be more than just a
				bookstore; we aim to be a vibrant hub of creativity, curiosity, and
				connection.
			</p>

			<p>
				Join us in our mission to spread the love of reading and make a positive
				impact on our community, one book at a time. 📚✨
			</p>

			<Link to="/about">Hide</Link>
		</section>
	)
}
