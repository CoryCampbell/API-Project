import csrfFetch from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";

const getAllSpots = (payload) => {
    return {
        type: GET_ALL_SPOTS,
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

const initialState = {
    spots: null
};

export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            console.log("action.payload", action.payload);
            let normalizedAllSpots = {};
            action.payload.Spots.forEach((spot) => {
                normalizedAllSpots[spot.id] = spot;
            });
            console.log("normalizedAllSpots", normalizedAllSpots);
            return normalizedAllSpots;
        default:
            return state;
    }
};

export default spotsReducer;
