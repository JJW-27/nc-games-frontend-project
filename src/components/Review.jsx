import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReview, getComments } from '../api';

const Review = () => {
  const { review_id } = useParams();

  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)

  useEffect(() => {
    getReview(review_id).then(fetchedReview => {
      setReview(fetchedReview['0']);
      setReviewLoading(false)
    });
  }, [review_id]);

  useEffect(() => {
    getComments(review_id).then(fetchedComments => {
      setComments(fetchedComments);
      setCommentsLoading(false)
    });
  }, [review_id]);

  return (reviewLoading && commentsLoading ? <h2>Loading...</h2> : <div className="single-review">
      <h2>{review.title}</h2>
      <p>
        Reviewed by: <em>{review.owner}</em>
      </p>
      <img src={review.review_img_url} alt={review.title} />
      <p className="single-review-body">{review.review_body}</p>

      <div className="votes-container">
        <p>votes: {review.votes}</p>
        <button>☝️</button>
        <button>👇</button>
      </div>

      <div className="comments-container">
        <h3>Comments</h3>
        <ul className="comments-list">
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <h4>{comment.author}</h4>
                <p>
                  <em>
                    {' '}
                    Posted: {new Date(comment.created_at).toLocaleString()}
                  </em>
                </p>
                <p>{comment.body}</p>
                <p>votes: {comment.votes}</p>
                <button>☝️</button>
                <button>👇</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Review;
