import { useEffect, useState } from "react";
import { fetchSpotReviews, deleteThisReview } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchSpotDetails } from "../../store/spots";
import "./DeleteReview.css";

function DeleteReview({ spot, review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchSpotReviews(spot.id));
  }, [dispatch, spot.id]);

  const deleteThisSingleReview = (e) => {
    e.preventDefault();
    dispatch(deleteThisReview(review.id));
    closeModal();
  };

  const doNotDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  if (!review) return null;

  return (
    <div className="deleteModal">
      <h2>Confirm Delete</h2>
      <div className="deleteReviewText">Are you sure you want to delete this review?</div>
      <button className="deleteReview" onClick={deleteThisSingleReview}>
        Yes (Delete Review)
      </button>
      <button className="doNotDelete" onClick={doNotDelete}>
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteReview;
