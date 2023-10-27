import React, { useEffect } from "react";
import { fetchSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import "./Reviews.css";

function Reviews({ spotId }) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.reviews));
    const spots = useSelector((state) => state.spots);

    console.log("spots-----", spots);
    console.log("reviews", reviews);

    useEffect(() => {
        dispatch(fetchSpotReviews(spotId));
    }, [dispatch, spotId]);

    const spot = spots[spotId];

    if (!spot) return null;
    if (!reviews) return null;

    return (
        <div className="reviewsContainer">
            <div className="reviewsHeader">
                <i className="fa-solid fa-star">{spot.avgRating}</i>
                <div> · </div>
                <div>{spot.numReviews} Reviews</div>
            </div>
            {reviews.map((review) => (
                <div className="perReview">{review?.review}</div>
            ))}
        </div>
    );
}

export default Reviews;
