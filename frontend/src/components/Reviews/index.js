import { useEffect } from "react";
import { fetchSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";
import DeleteReview from "../DeleteReview";
import "./Reviews.css";
import OpenModalButton from "../OpenModalButton";

function Reviews({ spotId }) {
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.thisSpot);
  const reviews = useSelector((state) => state.reviews.currentSpot.Reviews);
  const user = useSelector((state) => state.session.user);

  console.log("spot", spot);
  console.log("reviews", reviews);
  console.log("user", user);

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

  if (!reviews) return null;

  const orderedReviews = reviews?.slice().sort((review, secondReview) => {
    return new Date(secondReview.createdAt) - new Date(review.createdAt);
  });

  const youDontOwnThisSpot = spot?.Owner.id !== user?.id;

  let numReviewsText = "Reviews";
  if (spot?.numReviews === 1) numReviewsText = "Review";

  const haveNotReviewed = reviews?.find((review) => review?.User.id === user?.id) === undefined;

  let loggedIn = false;
  if (user) loggedIn = true;

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
          modalComponent={<PostReviewModal user={user} spot={spot} />}
        />
      )}
      <div className="singleReviewContainer">
        {orderedReviews?.map((review) => (
          <div key={review?.id} className="perReview">
            <div className="reviewUsername">{review?.User.firstName}</div>
            <div className="dateContainer">
              <div className="monthText">{month[new Date(review?.createdAt).getMonth()]}</div>
              <div className="yearText">{review?.createdAt.slice(0, 4)}</div>
            </div>
            <div>{review?.review}</div>
            {user?.id === review?.User?.id ? (
              <div className="deleteReviewButtonContainer">
                <OpenModalButton
                  className="deleteReviewButton"
                  buttonText="Delete"
                  modalComponent={<DeleteReview review={review} spot={spot} />}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
