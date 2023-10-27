import React, { useEffect } from "react";
import { fetchSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import "./Reviews.css";

function Reviews({ spotId }) {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);
    const reviews = useSelector((state) => Object.values(state.reviews));

    useEffect(() => {
        dispatch(fetchSpotReviews(spotId));
    }, [dispatch, spotId]);

    const spot = spots[spotId];
    console.log("spots", spots);
    console.log("spot", spot);
    console.log("reviews", reviews);

    if (!reviews.length) return null;

    return (
        <div className="reviewsContainer">
            <div className="reviewsHeader">
                <i className="fa-solid fa-star">{spot?.avgRating}</i>
                <div> · </div>
                <div>{spot?.numReviews} Reviews</div>
            </div>
            {reviews?.map((review) => (
                <div key={review.id} className="perReview">
                    {review?.review}
                </div>
            ))}
        </div>
    );
}

export default Reviews;
