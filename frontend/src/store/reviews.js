import csrfFetch from "./csrf";

const GET_SPOT_REVIEWS = "spotReviews/getSpotReviews";
const DELETE_THIS_REVIEW = "spotReviews/deleteThisReview";
const POST_NEW_REVIEW = "spotReviews/postNewReview";

const getSpotReviews = (payload) => {
  return {
    type: GET_SPOT_REVIEWS,
    payload
  };
};

const deleteReview = (payload) => {
  return {
    type: DELETE_THIS_REVIEW,
    payload
  };
};

const postNewReview = (payload) => {
  return {
    type: POST_NEW_REVIEW,
    payload
  };
};

export const fetchSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "GET"
  });

  if (response.ok) {
    const reviews = await response.json();
    dispatch(getSpotReviews(reviews));
    return reviews;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const postReview = (review, spotId) => async (dispatch) => {
  console.log("review", review);
  console.log("spotId", spotId);
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review)
  });

  if (response.ok) {
    const newReview = await response.json();

    dispatch(postNewReview(newReview));
    return newReview;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteThisReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
  } else {
    const errors = response.json();
    return errors;
  }
};

const initialState = {
  currentSpot: {},
  currentUser: {}
};

export const spotReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      return {
        ...state,
        currentSpot: action.payload
      };
    case POST_NEW_REVIEW:
      return { ...state, [action.payload.id]: action.review };

    case DELETE_THIS_REVIEW:
      const newReviews = [...state.currentSpot.Reviews];
      delete newReviews[action.spotId];
      return {
        ...state,
        currentSpot: { Reviews: newReviews }
      };
    default:
      return state;
  }
};

export default spotReviewsReducer;
