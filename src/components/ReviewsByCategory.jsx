import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsByCategory } from '../api';
import { Link } from 'react-router-dom';

const ReviewsByCategory = () => {
  const [reviewsByCategory, setReviewsByCategory] = useState([]);
  const [reviewsByCategoryIsLoading, setReviewsByCategoryIsLoading] =
    useState(true);

    const {category} = useParams()
  

  useEffect(() => {
    getReviewsByCategory(category).then(fetchedReviews => {
      setReviewsByCategory(fetchedReviews);
      setReviewsByCategoryIsLoading(false);
    });
  }, [category]);

  return reviewsByCategoryIsLoading ? (
    <h2 className="loading">Loading...</h2>
  ) : (
    <ul className="all-reviews-list">
      {reviewsByCategory.map(review => {
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

export default ReviewsByCategory;
