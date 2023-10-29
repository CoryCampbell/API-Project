import React, { useEffect } from "react";
import { fetchAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SplashPage.css";

function SplashPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spots));
    useEffect(() => {
        dispatch(fetchAllSpots());
    }, [dispatch]);

    const reactiveSpots = spots?.map((spot) => (
      <div key={spot?.id} className="splashSpotContainer">
        <NavLink to={`/spots/${spot?.id}`}>
          <div className="imageContainer">
            <img src={spot?.previewImage} alt="preview" className="previewImage"></img>
          </div>
          <div className="spotInfo">
            <div className="spotLocation">
              <div>
                {spot?.city}, {spot?.state}
              </div>
              <div className="spotAvgRating">
                <i className="fa-solid fa-star"></i>
                {spot?.avgRating}
              </div>
            </div>
            <div className="spotPrice">
              ${spot?.price}.00
              <div className="nightText">night</div>
            </div>
          </div>
        </NavLink>
      </div>
    ));
    return (
      <div className="fullSplashPage">
        <div className="splashSpreadSpotsContainer">{reactiveSpots}</div>
      </div>
    );
}

export default SplashPage;
