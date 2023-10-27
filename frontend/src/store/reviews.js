import csrfFetch from "./csrf";

const GET_SPOT_REVIEWS = "spotReviews/getSpotReviews";

const getSpotReviews = (payload) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload
    };
};

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "GET"
    });

    const reviews = await response.json();
    console.log("reviews", reviews);
    dispatch(getSpotReviews(reviews));
    return response;
};

const initialState = {};

export const spotReviewsReducer = (state = initialState, action) => {
    let normalizedSpotReviews = {};
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            action.payload.Reviews?.forEach((review) => {
                normalizedSpotReviews[review?.id] = review;
            });
            return normalizedSpotReviews;
        default:
            return state;
    }
};

export default spotReviewsReducer;
