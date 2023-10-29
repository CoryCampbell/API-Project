import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReview.css";

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

      //change the color of stars to match rating
      // for (let i = 0; i < e.target.id; i++) {
      //     //
      // }
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
          />
          <div className="starContainer">
            <i id="1" class="fa-regular fa-star" onClick={setRating}></i>
            <i id="2" class="fa-regular fa-star" onClick={setRating}></i>
            <i id="3" class="fa-regular fa-star" onClick={setRating}></i>
            <i id="4" class="fa-regular fa-star" onClick={setRating}></i>
            <i id="5" class="fa-regular fa-star" onClick={setRating}></i>
            <div className="starText">Stars</div>
          </div>
          <button className="submitReviewButton" disabled={text.length < 10}>
            Submit Your Review
          </button>
        </form>
      </div>
    );
}

export default PostReviewModal;


//! SOLID STAR ICON
//<i class="fa-solid fa-star"></i>;
