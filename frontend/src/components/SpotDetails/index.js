import React, { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetails.css";

function SpotDetails() {
    const { spotId } = useParams();
    console.log("spotId", spotId);
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);
    console.log("spots", spots);

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    const spot = spots[spotId];
    console.log("spot", spot);

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
                    <img alt="pic 1" className="mainSpotImage"></img>
                </div>
                <div className="otherImagesContainer">
                    <img src={spot.previewImage} alt="pic 2" className="spotImage"></img>
                    <img src="" alt="pic 3" className="spotImage"></img>
                    <img src="" alt="pic 4" className="spotImage"></img>
                    <img src="" alt="pic 5" className="spotImage"></img>
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
