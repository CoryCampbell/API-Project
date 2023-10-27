import React, { useEffect } from "react";
import { fetchSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import "./Reviews.css";

function Reviews({ spotId }) {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);
    const reviews = useSelector((state) => Object.values(state.reviews));
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    useEffect(() => {
        dispatch(fetchSpotReviews(spotId));
    }, [dispatch, spotId]);

    const orderedReviews = reviews.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const spot = spots[spotId];
    console.log("spots", spots);
    console.log("spot", spot);
    console.log("reviews", reviews);

    if (!reviews.length)
        return (
            <>
                <div className="reviewsHeader">
                    <i className="fa-solid fa-star"></i>
                    <div>New</div>
                    <div className="reviewHeaderSpacer"> · </div>
                    <div>{spot?.numReviews} Reviews</div>
                </div>
            </>
        );

    return (
        <div className="reviewsContainer">
            <div className="reviewsHeader">
                <i className="fa-solid fa-star"></i>
                <div>{spot?.avgRating}</div>
                <div className="reviewHeaderSpacer"> · </div>
                <div>{spot?.numReviews} Reviews</div>
            </div>
            <div className="singleReviewContainer">
                {orderedReviews?.map((review) => (
                    <div key={review?.id} className="perReview">
                        <div className="reviewUsername">{review.User.firstName}</div>
                        <div className="dateContainer">
                            <div className="monthText">{month[new Date(review.createdAt).getMonth()]}</div>
                            <div className="yearText">{review.createdAt.slice(0, 4)}</div>
                        </div>
                        <div>{review?.review}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reviews;
