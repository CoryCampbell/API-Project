import React, { useEffect } from "react";
import { fetchAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SpotDetails() {
    // const dispatch = useDispatch();
    // const spots = useSelector((state) => Object.values(state.spots));

    // useEffect(() => {
    //     dispatch(fetchAllSpots());
    // }, [dispatch]);

    // if (!spots[0]) return null;

    // const reactiveSpots = spots?.map((spot) => (
    //     <div key={spot.id} className="spotContainer">
    //         <NavLink to={`/spots/${spot.id}`}>
    //             <img src={spot.previewImage} alt="preview" className="previewImage"></img>
    //         </NavLink>
    //         <div className="spotInfoContainerOne">
    //             <div>
    //                 {spot.city}, {spot.state}
    //             </div>
    //             <div className="spotAvgRating">
    //                 <i className="fa-solid fa-star"></i>
    //                 {spot.avgRating}
    //             </div>
    //         </div>
    //         <div>
    //             ${spot.price}
    //             .00 night
    //         </div>
    //     </div>
    // ));
    return (
        <>
            <>Spot Details Component</>
        </>
    );
}

export default SpotDetails;
