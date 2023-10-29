import csrfFetch from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_USER_SPOTS = "spots/getUserSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";

const getAllSpots = (payload) => {
    return {
        type: GET_ALL_SPOTS,
        payload
    };
};

const getSpotDetails = (payload) => {
    return {
        type: GET_SPOT_DETAILS,
        payload
    };
};

const getUserSpots = (payload) => {
    return {
        type: GET_USER_SPOTS,
        payload
    };
};

export const fetchAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: "GET"
    });

    const allSpots = await response.json();

    dispatch(getAllSpots(allSpots));
    return allSpots;
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "GET"
    });

    const spotDetails = await response.json();

    dispatch(getSpotDetails(spotDetails));
    return spotDetails;
};

export const fetchUserSpots = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`, {
        method: "GET"
    });

    const userSpots = await response.json();

    dispatch(getUserSpots(userId));
    return userSpots;
};

const initialState = {};

export const spotsReducer = (state = initialState, action) => {
    let normalizedAllSpots = {};
    switch (action.type) {
        case GET_ALL_SPOTS:
            action.payload.Spots.forEach((spot) => {
                normalizedAllSpots[spot.id] = spot;
            });
            return normalizedAllSpots;
        case GET_SPOT_DETAILS:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};

export default spotsReducer;
