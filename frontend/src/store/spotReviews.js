import csrfFetch from "./csrf";

const GET_SPOT_REVIEWS = "spotReviews/getSpotReviews";

const getSpotReviews = (payload) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload
    };
};

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/${spotId}/reviews`, {
        method: "GET"
    });

    const spotReviews = await response.json();
    console.log("spotReviews-------------", spotReviews);
    dispatch(getSpotReviews(spotReviews));
    return response;
};

const initialState = {
    spots: null
};

export const spotReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            console.log("action", action);
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};

export default spotReviewsReducer;
