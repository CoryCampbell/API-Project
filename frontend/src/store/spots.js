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

const initialState = { spots: null };

export const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { ...action.payload };
            return newState;
        default:
            return initialState;
    }
};

export default spotsReducer;
