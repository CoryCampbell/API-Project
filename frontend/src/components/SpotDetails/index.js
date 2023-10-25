import React, { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
        <>
        
            <>Spot Details Component for {spotId}</>
        </>
    );
}

export default SpotDetails;
