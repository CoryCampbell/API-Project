import { useDispatch, useSelector } from "react-redux";
import "./CreateASpot.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { fetchAllSpots } from "../../store/spots";
import { createNewSpot } from "../../store/spots";

function CreateASpot() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageMain, setImageMain] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [errors, setErrors] = useState({});

  const newImages = [];
  if (imageMain) newImages.push(imageMain);
  if (image2) newImages.push(image2);
  if (image3) newImages.push(image3);
  if (image4) newImages.push(image4);
  if (image5) newImages.push(image5);

  const newSpot = {
    ownerId: user.id,
    country,
    address,
    city,
    state,
    description,
    name: title,
    price,
    previewImage: imageMain
  };

  function validateCredentials() {
    const errorsObject = {};

    if (!country) errors.country = "Country is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!description) errors.description = "Description is required";
    if (!title) errors.title = "Title is required";
    if (!price) errors.price = "Price is required";

    setErrors(errorsObject);
  }

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const response = await dispatch(createNewSpot(newSpot));
      history.push(`/spots/${response.id}`);
    }
  };

  return (
    <div className="createaspotContainer">
      <form className="createaspotForm" onSubmit={handleSubmit}>
        <div className="locationInfoContainer">
          <h1>Create a new Spot</h1>
          <h2>Where's your place located?</h2>
          <h4>Guests will only get your exact address once they've booked a reservation.</h4>
          <label>
            Country
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </label>
          {errors.country && <p className="errors">{errors.country}</p>}
          <label>
            Street Address
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </label>
          <div className="cityAndState">
            <div className="cityLeftContainer">
              <label className="cityLabel">
                City
                <input
                  type="text"
                  className="cityText"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                ></input>
              </label>
              <p className="commaContainer">,</p>
            </div>
            <div className="cityRightContainer">
              <label className="stateLabel">
                State
                <input
                  type="text"
                  className="stateText"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                ></input>
              </label>
            </div>
          </div>
        </div>
        <div className="descriptionContainer">
          <h2>Describe your place to guests</h2>
          <h4>
            Mention the best features of your space, any special amentities like fast wifi or parking, and what you love
            about the neighborhood.
          </h4>
          <textarea
            className="descriptionTextarea"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="titleInfoContainer">
          <h2>Create a title for your spot</h2>
          <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
          <input
            type="text"
            className="titleText"
            placeholder="Name of your spot"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>
        </div>
        <div className="priceInfoContainer">
          <h2>Set a base price for your spot</h2>
          <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
          <div className="priceInfoLineContainer">
            <p className="dollaSign">$</p>
            <input
              type="text"
              className="priceInfoText"
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <div className="photosInfoContainer">
          <h2>Liven up your spot with photos</h2>
          <h4>Submit a link to at least one photo to publish your spot.</h4>
          <input
            type="text"
            className="imageText"
            placeholder="Preview Image URL"
            value={imageMain}
            onChange={(e) => setImageMain(e.target.value)}
            required
          ></input>
          <input
            type="text"
            className="imageText"
            placeholder="Image URL"
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
          ></input>
          <input
            type="text"
            className="imageText"
            placeholder="Image URL"
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
          ></input>
          <input
            type="text"
            className="imageText"
            placeholder="Image URL"
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
          ></input>
          <input
            type="text"
            className="imageText"
            placeholder="Image URL"
            value={image5}
            onChange={(e) => setImage5(e.target.value)}
          ></input>
        </div>
        <div className="submitContainer">
          <button className="createSpotButton" onClick={validateCredentials}>
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateASpot;
