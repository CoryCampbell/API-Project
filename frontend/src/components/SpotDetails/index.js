import React, { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetails.css";

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    const spot = spots[spotId];
    console.log("spot", spot);
    console.log("spots", spots);

    if (!spot) return null;
    if (!spot.SpotImages) return null;

    return (
        <div className="spotDetailsContainer">
            <div>
                <div>{spot.name}</div>
                <div>
                    {spot.city}, {spot.state}, {spot.country}
                </div>
            </div>
            <div className="allImagesContainer">
                <div className="mainSpotImageContainer">
                    <img src={spot.SpotImages[0].url} alt="pic 1" className="mainSpotImage"></img>
                </div>
                <div className="otherImagesContainer">
                    <img src={spot.SpotImages[1].url} alt="pic 2" className="spotImage"></img>
                    <img src={spot.SpotImages[2].url} alt="pic 3" className="spotImage"></img>
                    <img src={spot.SpotImages[3].url} alt="pic 4" className="spotImage"></img>
                    <img src={spot.SpotImages[4].url} alt="pic 5" className="spotImage"></img>
                </div>
            </div>
            <div className="spotInfoContainer">
                <div className="spotInfoLeft">
                    Hosted by owner #{spot.ownerId}
                    <div>{spot.description}</div>
                </div>
                <div className="spotInfoRight">spotInfoContainerRight</div>
            </div>
            <div className="spotReviewContainer">Reviews</div>
        </div>
    );
}

export default SpotDetails;
