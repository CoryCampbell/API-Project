import React, { useEffect } from "react";
import { fetchAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./ManageSpots.css";

function ManageSpots() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spots));
    const user = useSelector((state) => state.session.user);
    console.log("user", user);
    useEffect(() => {
        dispatch(fetchAllSpots());
    }, [dispatch]);

    const userSpots = spots.filter((spot) => spot.ownerId === user.id);

    const allUserSpots = userSpots?.map((spot) => (
      <div className="fullManageSpotContainer">
        <div key={spot?.id} className="manageSpotContainer">
          <NavLink to={`/spots/${spot?.id}`}>
            <div className="manageImageContainer">
              <img src={spot?.previewImage} alt="preview" className="managePreviewImage"></img>
            </div>
            <div className="manageSpotInfo">
              <div className="manageSpotLocation">
                <div>
                  {spot?.city}, {spot?.state}
                </div>
                <div className="spotAvgRating">
                  <i className="fa-solid fa-star"></i>
                  {spot?.avgRating}
                </div>
              </div>
              <div className="manageSpotPrice">
                ${spot?.price}.00
                <div className="nightText">night</div>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="manageCrudButtonsContainer">
          <NavLink to={`/spots/${spot?.id}/edit`} className="updateButtonLink">
            Update
          </NavLink>
          <NavLink to="/spots/current" className="deleteButtonLink">
            Delete
          </NavLink>
        </div>
      </div>
    ));

    return (
      <div className="manageUserSpotsContainer">
        <h1 className="manageSpotsH1">Manage Spots</h1>
        <NavLink to="/spots/new" className="manageCreateSpotLink">
          Create a New Spot
        </NavLink>
        <ul className="manageAllSpotsContainer">{allUserSpots}</ul>
      </div>
    );
}

export default ManageSpots;
