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
    console.log("spots", spots);

    const spot = useSelector((state) => state.spots[spotId]);
    console.log("spot---------", spot);

    const reviews = useSelector((state) => Object.values(state.reviews));
    console.log("reviews", reviews);

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    const reserveAlert = () => {
        alert("Feature Coming Soon...");
    };

    if (!spot) return null;
    if (!spots) return null;
    if (!spot.SpotImages) return null;

    return (
        <div className="spotDetailsContainer">
            <div>
                <div>{spot?.name}</div>
                <div>
                    {spot?.city}, {spot.state}, {spot.country}
                </div>
            </div>
            <div className="allImagesContainer">
                <div className="mainSpotImageContainer">
                    <img src={spots[spotId].SpotImages[0].url} alt="pic 1" className="mainSpotImage"></img>
                </div>
                <div className="otherImagesContainer">
                    <img src={spots[spotId].SpotImages[1].url} alt="pic 2" className="spotImage"></img>
                    <img src={spots[spotId].SpotImages[2].url} alt="pic 3" className="spotImage"></img>
                    <img src={spots[spotId].SpotImages[3].url} alt="pic 4" className="spotImage"></img>
                    <img src={spots[spotId].SpotImages[4].url} alt="pic 5" className="spotImage"></img>
                </div>
            </div>
            <div className="spotInfoContainer">
                <div className="spotInfoLeft">
                    <div className="hostContainer">
                        Hosted by
                        <div className="nameContainer">
                            <div className="nameContent">{spot?.Owner.firstName}</div>
                            <div className="nameContent">{spot?.Owner.lastName}</div>
                        </div>
                    </div>
                    <div>{spot?.description}</div>
                </div>
                <div className="spotInfoRight">
                    <div className="reserveBox">
                        <div className="reserveInfoContainer">
                            <div className="spotPriceContainer">
                                <div className="spotPriceContent">${spot?.price}</div>
                                <div className="nightContent">/night</div>
                            </div>
                            <div className="reserveInfoRight">
                                <i className="fa-solid fa-star"></i>
                                <div>{spot?.avgRating}</div>
                                <div>·</div>
                                <div>{spot?.numReviews} Reviews</div>
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
