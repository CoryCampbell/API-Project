import React, { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Reviews from "../Reviews";
import "./SpotDetails.css";

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots);

    const spot = useSelector((state) => state.spots[spotId]);

    useEffect(() => {
      dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    const reserveAlert = () => {
      alert("Feature Coming Soon");
    };

    if (!spot) return null;
    if (!spots) return null;
    if (!spot.SpotImages) return null;

    let totalNumReviewsText = "Reviews";
    let reviewCheck = spot?.numReviews > 0;
    let totalNumReviewsCount = spot?.numReviews;

    return (
      <div className="spotDetailsContainer">
        <div>
          <div className="detailsName">{spot?.name}</div>
          <div className="detailsLocation">
            {spot?.city}, {spot?.state}, {spot?.country}
          </div>
        </div>
        <div className="detailsAllImagesContainer">
          <div className="detailsMainSpotImageContainer">
            <img src={spots[spotId].SpotImages[0]?.url} alt="pic 1" className="mainSpotImage"></img>
          </div>
          <div className="otherImagesContainer">
            <img src={spots[spotId].SpotImages[1]?.url} alt="pic 2" className="detailsSpotImage"></img>
            <img src={spots[spotId].SpotImages[2]?.url} alt="pic 3" className="detailsSpotImage"></img>
            <img src={spots[spotId].SpotImages[3]?.url} alt="pic 4" className="detailsSpotImage"></img>
            <img src={spots[spotId].SpotImages[4]?.url} alt="pic 5" className="detailsSpotImage"></img>
          </div>
        </div>
        <div className="detailsSpotInfoContainer">
          <div className="spotInfoLeft">
            <div className="hostContainer">
              Hosted by
              <div className="detailsNameContainer">
                <div className="nameContent">{spot?.Owner.firstName}</div>
                <div className="nameContent">{spot?.Owner.lastName}</div>
              </div>
            </div>
            <div>{spot?.description}</div>
          </div>
          <div className="spotInfoRight">
            <div className="reserveBox">
              <div className="reserveInfoContainer">
                <div className="detailsSpotPriceContainer">
                  <div className="spotPriceContent">${spot?.price}</div>
                  <div className="nightContent">/night</div>
                </div>
                <div className="reserveInfoRight">
                  <i className="fa-solid fa-star"></i>
                  <div> {spot?.avgRating ? <p>{parseFloat(`${spot?.avgRating}`).toFixed(1)}</p> : <p>New</p>}</div>
                  <div className="totalReviewsDynamic">
                    {reviewCheck && <p className="divider"> · </p>}
                    <div className="totalNumReviewsCount">{reviewCheck && totalNumReviewsCount}</div>
                    {reviewCheck && totalNumReviewsText}
                  </div>
                </div>
              </div>
              <div className="reserveButtonContainer">
                <button className="reserveButton" onClick={reserveAlert}>
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
        <Reviews spotId={spotId} />
      </div>
    );
}

export default SpotDetails;
