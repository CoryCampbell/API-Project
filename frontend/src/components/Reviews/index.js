import React, { useEffect } from "react";
import { fetchSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";
import "./Reviews.css";

function Reviews({ spotId }) {
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots.allSpots.Spots);
  const spot = useSelector((state) => state.spots.thisSpot);
  const reviews = useSelector((state) => state.reviews.currentSpot);
  const user = useSelector((state) => state.session.user);

  console.log("spot", spot);
  console.log("spots", spots);
  console.log("reviews", reviews);

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
    dispatch(fetchSpotReviews(spot.id));
  }, [dispatch, spot]);

  const orderedReviews = reviews.sort((review, secondReview) => {
    return new Date(secondReview.createdAt) - new Date(review.createdAt);
  });

  const youDontOwnThisSpot = spot?.Owner.id !== user?.id;
  console.log("youDontOwnThisSpot", youDontOwnThisSpot);

  let numReviewsText = "Reviews";
  if (spot.numReviews === 1) numReviewsText = "Review";

  const haveNotReviewed = reviews?.find((review) => review?.User.id === user?.id) === undefined;
  console.log("haveNotReviewed", haveNotReviewed);

  let loggedIn = false;
  if (user) loggedIn = true;
  console.log("loggedIn", loggedIn);

  // function postNewReview() {
  //   console.log("test");
  // }

  if (!reviews.length)
    return (
      <div className="reviewsContainer">
        <div className="reviewsHeader">
          <i className="fa-solid fa-star"></i>
          <div>New</div>
        </div>
        {loggedIn && youDontOwnThisSpot && haveNotReviewed && (
          <OpenModalMenuItem
            className="postReviewButton"
            buttonText="Post Your Review"
            modalComponent={<PostReviewModal />}
          />
        )}
        {youDontOwnThisSpot && loggedIn && haveNotReviewed && <div>Be the first to post a review!</div>}
      </div>
    );

  return (
    <div className="reviewsContainer">
      <div className="reviewsHeader">
        <i className="fa-solid fa-star"></i>
        <div>{spot?.avgRating}</div>
        <div className="reviewHeaderSpacer"> · </div>
        <div>
          {spot?.numReviews} {numReviewsText}
        </div>
      </div>
      {loggedIn && youDontOwnThisSpot && haveNotReviewed && (
        <OpenModalMenuItem
          className="postReviewButton"
          buttonText="Post Your Review"
          modalComponent={<PostReviewModal />}
        />
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
