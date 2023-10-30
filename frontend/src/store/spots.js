import csrfFetch from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_USER_SPOTS = "spots/getUserSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const CREATE_A_SPOT = "spots/createSpot";
const CREATE_SPOT_IMAGE = "spots/createSpotImages";
const UPDATE_A_SPOT = "spots/deleteSpot";
const DELETE_THIS_SPOT = "spots/deleteThisOneSpot";

const getAllSpots = (payload) => {
  return {
    type: GET_ALL_SPOTS,
    payload
  };
};

const createSpot = (payload) => {
  return {
    type: CREATE_A_SPOT,
    payload
  };
};

const updateSpot = (payload) => {
  return {
    type: UPDATE_A_SPOT
  };
};

const createSpotImage = (payload) => {
  return {
    type: CREATE_SPOT_IMAGE,
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

const deleteThisOneSpot = (payload) => {
  return {
    type: DELETE_THIS_SPOT,
    payload
  };
};

export const deleteThisSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    dispatch(deleteThisOneSpot(spotId));
  } else {
    const errors = response.json();
    return errors;
  }
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

export const createNewSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createSpot(newSpot));
    return newSpot;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateASpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot));
    console.log("updatedSpot", updatedSpot);
    dispatch(fetchSpotDetails(payload.id));
    return updatedSpot;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createNewImage = (image, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(image)
  });

  if (response.ok) {
    const newImage = await response.json();
    dispatch(createSpotImage(newImage));
    return newImage;
  } else {
    const errors = await response.json();
    return errors;
  }
};

const initialState = {
  allSpots: {},
  thisSpot: {}
};

export const spotsReducer = (state = initialState, action) => {
  const spotsAfterAddition = { ...state.allSpots.Spots };
  switch (action.type) {
    case GET_ALL_SPOTS:
      return {
        ...state,
        allSpots: action.payload
      };

    case GET_SPOT_DETAILS:
      return { ...state, thisSpot: action.payload };

    case CREATE_A_SPOT:
      return { ...state, allSpots: spotsAfterAddition, thisSpot: action.payload };

    case UPDATE_A_SPOT:
      spotsAfterAddition[action.payload] = action.payload;
      return {
        ...state,
        allSpots: spotsAfterAddition,
        thisSpot: action.payload
      };

    case DELETE_THIS_SPOT:
      delete spotsAfterAddition[action.payload];
      return {
        ...state,
        allSpots: spotsAfterAddition
      };

    default:
      return state;
  }
};

export default spotsReducer;
