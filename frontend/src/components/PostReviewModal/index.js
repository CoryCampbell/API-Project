import React, { useState } from "react";
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
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit} className="reviewForm">
                <input className="reviewText" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <div className="starContainer">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default PostReviewModal;
