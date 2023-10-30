import React, { useState } from "react";
import * as sessionActions from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReviewModal.css";

function PostReviewModal() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const setRating = (e) => {
    //set rating to whatever star they clicked on
    e.preventDefault();
    setStars(e.target.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.postReview({ text, stars }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data);
        }
      });
  };

  return (
    <div className="postReviewContainer">
      <h1 className="starh1">How was your stay?</h1>
      {errors.message && <p className="postReviewErrorMessage">{errors.message}</p>}
      <form onSubmit={handleSubmit} className="reviewForm">
        <textarea
          className="reviewText"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave your review here..."
          required
        />
        <div className="starContainer">
          <i id="1" className={stars > 0 ? "fa-solid fa-star" : "fa-regular fa-star"} onClick={setRating}></i>
          <i id="2" className={stars > 1 ? "fa-solid fa-star" : "fa-regular fa-star"} onClick={setRating}></i>
          <i id="3" className={stars > 2 ? "fa-solid fa-star" : "fa-regular fa-star"} onClick={setRating}></i>
          <i id="4" className={stars > 3 ? "fa-solid fa-star" : "fa-regular fa-star"} onClick={setRating}></i>
          <i id="5" className={stars > 4 ? "fa-solid fa-star" : "fa-regular fa-star"} onClick={setRating}></i>
          <div className="starText">Stars</div>
        </div>
        <button className="submitReviewButton" disabled={text.length < 10 || stars < 1}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default PostReviewModal;
