import csrfFetch from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
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

export const fetchAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: "GET"
    });

    const allSpots = await response.json();

    dispatch(getAllSpots(allSpots));
    return response;
};

export const fetchSpotDetails = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/:spotId", {
        method: "GET"
    });

    const spotDetails = await response.json();

    dispatch(getSpotDetails(spotDetails));
    return response;
};

const initialState = {
    spots: null
};

export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            let normalizedAllSpots = {};
            action.payload.Spots.forEach((spot) => {
                normalizedAllSpots[spot.id] = spot;
            });
            return normalizedAllSpots;
        default:
            return state;
    }
};

export default spotsReducer;
