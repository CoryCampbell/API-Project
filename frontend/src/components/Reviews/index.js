import React, { useEffect } from "react";
import { fetchSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";
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

    const user = useSelector((state) => state.session.user);
    console.log("user", user);

    const youOwnThisSpot = spot?.Owner.id === user?.id;
    console.log("youOwnThisSpot", youOwnThisSpot);

    let loggedIn = false;
    if (user) loggedIn = true;

    function postNewReview() {
        console.log("test");
    }

    console.log("spots", spots);
    console.log("spot", spot);
    console.log("reviews", reviews);

    if (!reviews.length)
        return (
            <div className="reviewsContainer">
                <div className="reviewsHeader">
                    <i className="fa-solid fa-star"></i>
                    <div>New</div>
                </div>
                {loggedIn && !youOwnThisSpot && (
                    <OpenModalMenuItem
                        className="postReviewButton"
                        buttonText="Post Your Review"
                        modalComponent={<PostReviewModal />}
                    />
                )}
                <div>Be the first to post a review!</div>
            </div>
        );

    return (
        <div className="reviewsContainer">
            <div className="reviewsHeader">
                <i className="fa-solid fa-star"></i>
                <div>{spot?.avgRating}</div>
                <div className="reviewHeaderSpacer"> · </div>
                <div>{spot?.numReviews} Reviews</div>
            </div>
            {loggedIn && !youOwnThisSpot && (
                <button onClick={postNewReview} className="createAReviewButton">
                    Post Your Review
                </button>
            )}
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
