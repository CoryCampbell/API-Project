// import { csrfFetch } from "./csrf";

// const GET_SPOTS = "spot/GET_SPOTS";

// const allSpots = (spots) => {
//     return {
//         type: GET_SPOTS,
//         spots
//     };
// };

// export const getAllSpots = () => async (dispatch) => {
//     const result = await csrfFetch("/api/spots");

//     const data = await result.json();
//     dispatch(allSpots(data.Spots));
//     return result;
// };

// export const spotsReducer = (initialState = {}, action) => {
//     const state = { ...initialState };
//     switch (action.type) {
//         case GET_SPOTS:
//             const allSpots = {};
//             action.spots.forEach((spot) => {
//                 allSpots[spot.id] = spot;
//             });
//             return (state.spots = allSpots);
//         default:
//             return initialState;
//     }
// };

// export default spotsReducer;
