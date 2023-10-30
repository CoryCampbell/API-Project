import csrfFetch from "./csrf";

const GET_SPOT_REVIEWS = "spotReviews/getSpotReviews";
const POST_NEW_REVIEW = "spotReviews/postNewReview";

const getSpotReviews = (payload) => {
    return {
        type: GET_SPOT_REVIEWS,
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

export const postReview = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST"
  });

  const newReview = await response.json();

  dispatch(postNewReview(newReview));
  return newReview;
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
    //   action.payload.Reviews?.forEach((review) => {
    //     normalizedSpotReviews[review.id] = review;
    //   });
    //   return normalizedSpotReviews;
    case POST_NEW_REVIEW:
      return {
        ...state,
        currentSpot: {
          Reviews: [...state.spot.Reviews, action.payload]
        }
      };
    default:
      return state;
  }
};

export default spotReviewsReducer;
