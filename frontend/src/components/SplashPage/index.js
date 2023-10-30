import React, { useEffect } from "react";
import { fetchAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SplashPage.css";

function SplashPage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));
  console.log("spots", spots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);
  if (!spots.length) return null;

  const reactiveSpots = spots?.map((spot) => (
    <div key={spot?.id} className="splashSpotContainer">
      <NavLink to={`/spots/${spot?.id}`}>
        <div className="imageContainer">
          <div className="splashToolTip" title={spot.name}>
            <img src={spot?.previewImage} alt="preview" className="previewImage" />
          </div>
        </div>
        <div className="spotInfo">
          <div className="spotLocation">
            <div className="splashCityAndState">
              {spot?.city}, {spot?.state}
            </div>
            <div className="spotAvgRating">
              <i className="fa-solid fa-star"></i>
              <div className="splashRatingText">
                {spot?.avgRating ? <p>{parseFloat(`${spot?.avgRating}`).toFixed(1)}</p> : <p>New</p>}
              </div>
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
