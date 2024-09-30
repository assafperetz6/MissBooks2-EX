export function ReviewList({ reviews }) {
    const STAR = '⭐'
    return (
        <ul className=" review-list clean-list">
            {reviews.map(({ id, fullName, rating, readAt, content }) => (
                <li key={id}>
                    <p>"{content}"</p> - <span className="bold">{fullName}</span>
                    <p><span>{readAt}</span><span>{STAR.repeat(rating)}</span></p>
                </li>
            ))}
        </ul>
    )
}