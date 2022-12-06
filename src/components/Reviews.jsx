import { useState, useEffect } from 'react';
import { getReviews } from '../api';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    getReviews().then(fetchedReviews => {
      setReviews(fetchedReviews);
      setReviewsLoading(false);
    });
  }, []);

  return reviewsLoading ? (
    <h2 className="loading">Loading...</h2>
  ) : (
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
          </li>
        );
      })}
    </ul>
  );
};

export default Reviews;
