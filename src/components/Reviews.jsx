import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../api';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsIsLoading, setReviewsIsLoading] = useState(true);

  const { category } = useParams();

  useEffect(() => {
    getReviews(category).then(fetchedReviews => {
      setReviews(fetchedReviews);
      setReviewsIsLoading(false);
    });
  }, [category]);

  return reviewsIsLoading ? (
    <h2 className="loading">Loading...</h2>
  ) : (
    <div className="reviews-container">
      <nav>
        Sort by:<Link>Date (asc)</Link>
        <Link>Date (desc)</Link>
      </nav>
      <ul className="all-reviews-list">
        {reviews.map(review => {
          return (
            <li className="single-review-list-item" key={review.review_id}>
              <h2>{review.title}</h2>
              <p>
                Reviewed by: <em>{review.owner}</em>
              </p>
              <img src={review.review_img_url} alt={review.title} />
              <p>
                <em>{review.review_body.slice(0, 100)} </em>
                <Link to={`/review/${review.review_id}`}>
                  <em>...</em>
                  <strong>read more</strong>
                </Link>
              </p>
              <p>votes: {review.votes}</p>
              <p>comments: {review.comment_count}</p>
              <p>
                <em>Posted: {new Date(review.created_at).toLocaleString()}</em>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
