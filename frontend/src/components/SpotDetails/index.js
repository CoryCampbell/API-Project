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

    return (
        <div className="spotDetailsContainer">
            <>Spot Details Component for {spotId}</>
            <div className="imagesContainer">
                imagesContainer
                <img alt="pic 1" className="spotImage"></img>
                <img alt="pic 2" className="spotImage"></img>
                <img alt="pic 3" className="spotImage"></img>
                <img alt="pic 4" className="spotImage"></img>
                <img alt="pic 5" className="spotImage"></img>
            </div>
            <div>spotInfoContainer</div>
        </div>
    );
}

export default SpotDetails;
