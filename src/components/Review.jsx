import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import userContext from '../contexts/User';
import {
  getReview,
  getComments,
  patchReviewVotes,
  postComment,
  deleteComment,
} from '../api';

const Review = () => {
  const { user } = useContext(userContext);

  const { review_id } = useParams();

  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [err, setErr] = useState(null);
  const [userExists, setUserExists] = useState(true);

  useEffect(() => {
    getReview(review_id).then(fetchedReview => {
      setReview(fetchedReview['0']);
      setReviewLoading(false);
    });
  }, [review_id]);

  useEffect(() => {
    getComments(review_id).then(fetchedComments => {
      setComments(fetchedComments);
      setCommentsLoading(false);
    });
  }, [review_id, comments]);

  const handleUpVote = () => {
    setReview(currReview => {
      return { ...currReview, votes: currReview.votes + 1 };
    });
    patchReviewVotes(review.review_id, 1).catch(err => {
      setReview(currReview => {
        return { ...currReview, votes: currReview.votes - 1 };
      });
      setErr('Something went wrong, please try again');
    });
  };

  const handleDownVote = () => {
    setReview(currReview => {
      return { ...currReview, votes: currReview.votes - 1 };
    });
    patchReviewVotes(review.review_id, -1).catch(err => {
      setReview(currReview => {
        return { ...currReview, votes: currReview.votes + 1 };
      });
      setErr('Something went wrong, please try again');
    });
  };

  const handleCommentSubmit = event => {
    event.preventDefault();
    const commentBody = event.target['0'].value;
    postComment(user, review.review_id, commentBody)
      .then(newComment => {
        setComments(currComments => {
          const newComments = [...currComments];
          newComments.unshift(newComment);
          return newComments;
        });
        setIsSubmitted(true);
      })
      .catch(err => {
        if (err.response.data.msg === 'User does not exist') {
          setUserExists(false);
        }
      });
  };

  let commentContainer;

  isSubmitted
    ? (commentContainer = <p>comment added!</p>)
    : (commentContainer = (
        <div>
          <h3>Add new comment</h3>
          <form onSubmit={handleCommentSubmit} id="new-comment">
            <textarea
              form="new-comment"
              placeholder="new comment..."
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ));

  const handleDelete = event => {
    event.preventDefault();
    const commentId = event.target.parentElement.id;
    deleteComment(commentId).then(() => {
      setComments(currComments => {
        const newComments = currComments.filter(comment => {
          return comment.comment_id !== commentId;
        });
        return newComments;
      });
    });
  };

  if (err) return <p>{err}</p>;
  return reviewLoading && commentsLoading ? (
    <h2 className="loading">Loading...</h2>
  ) : (
    <div className="single-review">
      <h2>{review.title}</h2>
      <p>
        Reviewed by: <em>{review.owner}</em>
      </p>
      <img src={review.review_img_url} alt={review.title} />
      <p className="single-review-body">{review.review_body}</p>

      <div className="votes-container">
        <p>votes: {review.votes}</p>
        <button onClick={handleUpVote}>☝️</button>
        <button onClick={handleDownVote}>👇</button>
      </div>

      <div className="comments-container">
        {commentContainer}
        {!userExists && <p>Please log in before posting a comment</p>}
      </div>

      <div className="comments-container">
        <h3>Comments</h3>
        <ul className="comments-list">
          {comments.map(comment => {
            return (
              <li key={comment.comment_id} id={comment.comment_id}>
                <h4>{comment.author}</h4>
                <p>
                  <em>
                    Posted: {new Date(comment.created_at).toLocaleString()}
                  </em>
                </p>
                <p>{comment.body}</p>
                <p>votes: {comment.votes}</p>
                <button>☝️</button>
                <button>👇</button>
                {comment.author === user && <button onClick={handleDelete}>delete</button>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Review;
