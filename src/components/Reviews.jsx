import { useState, useEffect } from 'react';
import getReviews from '../api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then(fetchedReviews => {
      setReviews(fetchedReviews);
    });
  }, []);

  return (
    <ul className="all-reviews-list">
      {reviews.map(review => {
        return (
          <li className="single-review-list-item" key={review.review_id}>
            <h2>{review.title}</h2>
            <p>
              Reviewed by: <em>{review.owner}</em>
            </p>
            <img src={review.review_img_url} />
            <p>
              <em>{review.review_body.slice(0, 100)} ...</em>
              <strong>read more</strong>
            </p>
            <p>votes: {review.votes}</p>
            <p>comments: {reviews.comments}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Reviews;
