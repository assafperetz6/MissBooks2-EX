const { Link } = ReactRouterDOM

export function Team() {
	return (
		<section className="team">
			<h2>Meet Our Team</h2>
			<p>
				At <span className="bold">MissBooks</span>, our team is passionate about
				bringing the joy of reading to our community. Here’s a glimpse of the
				people who make it all happen:
			</p>

			<p>
				<span className="bold">Emma Johnson</span> - Store Manager With over a
				decade of experience in the book industry, Emma ensures that our store
				runs smoothly and that every customer finds their perfect read. Her
				favorite genre? Historical fiction!
			</p>

			<p>
				<span className="bold">Liam Smith</span> - Head of Customer Service
				Liam’s friendly demeanor and extensive knowledge of books make him a
				favorite among our customers. He’s always ready with a recommendation or
				a helping hand.
			</p>

			<p>
				<span className="bold">Sophia Brown</span> - Events Coordinator Sophia
				organizes our book signings, reading clubs, and community events. Her
				creativity and enthusiasm bring our literary events to life.
			</p>

			<p>
				<span className="bold">Noah Davis</span> - Inventory Specialist Noah
				meticulously manages our inventory, ensuring that we always have the
				latest bestsellers and timeless classics in stock. He’s a mystery novel
				aficionado.
			</p>

			<p>
				<span className="bold">Ava Wilson</span> - Marketing Guru Ava’s
				innovative marketing strategies keep our customers informed about new
				arrivals and special promotions. She’s a lover of all things fantasy.
			</p>

			<p>
				Together, we strive to create a welcoming and inspiring environment for
				all book lovers. Come visit us and meet the team at{' '}
				<span className="bold">MissBooks</span>! 📚
			</p>

			<Link to="/about">Hide</Link>
		</section>
	)
}
