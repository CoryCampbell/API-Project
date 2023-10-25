import React, { useEffect } from "react";
import { fetchAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import "./SplashPage.css";

function SplashPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.Spots);

    useEffect(() => {
        dispatch(fetchAllSpots());
    }, [dispatch]);

    const reactiveSpots = spots?.map((spot) => (
        <div key={spot.id} className="spotContainer">
            <img src={spot.previewImage} alt="preview" className="previewImage"></img>
            {spot.address}
            <br></br>
            {spot.city}
            <br></br>
            {spot.state}
        </div>
    ));
    return (
        <>
            Splash Page
            <ul className="allSpotsContainer">{reactiveSpots}</ul>
        </>
    );
}

export default SplashPage;
