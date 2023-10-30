import { useState } from "react";
import { deleteThisSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteButton({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [spotExists, setSpotExists] = useState(true);

  const deleteSpotModal = (e) => {
    e.preventDefault();
    dispatch(deleteThisSpot(spot.id)).then(closeModal);
    setSpotExists(false);
  };

  const cancelDeleteSpotModal = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {spotExists && (
        <div className="deleteModalContainer">
          <div className="deleteModal">
            <h2 className="deleteSpot">Confirm Delete</h2>
            <div className="deleteText">Are you sure you want to remove this spot?</div>
            <button className="Delete" onClick={deleteSpotModal}>
              Yes (Delete Spot)
            </button>
            <button className="dontDelete" onClick={cancelDeleteSpotModal}>
              No (Keep Spot)
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteButton;
