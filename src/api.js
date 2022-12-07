import axios from 'axios';

export const gamesApi = axios.create({
  baseURL: 'https://real-rose-worm-kit.cyclic.app/api',
});

export const getReviews = () => {
  return gamesApi.get('/reviews').then(reviews => {
    return reviews.data.reviews;
  });
};

export const getReview = review_id => {
  return gamesApi.get(`/reviews/${review_id}`).then(review => {
    return review.data.review;
  });
};

export const getComments = review_id => {
  return gamesApi.get(`/reviews/${review_id}/comments`).then(comments => {
    return comments.data.comments;
  });
};

export const getCategories = () => {
  return gamesApi.get('/categories').then(categories => {
    return categories.data.categories;
  });
};

export const getReviewsByCategory = category => {
  return gamesApi.get('/reviews', { params: { category } }).then(reviews => {
    return reviews.data.reviews;
  });
};

export const patchReviewVotes = (review_id, increment) => {
  return gamesApi.patch(`/reviews/${review_id}`, { inc_votes: increment });
};

export const getUsers = () => {
  return gamesApi.get('/users').then(users => {
    return users.data.users;
  });
};

export const postComment = (user, review_id, commentBody) => {
  return gamesApi.post(`reviews/${review_id}/comments`, {
    "username": user,
    "body": commentBody,
  }).then(comment => {
    return comment.data.comment
  })
};
