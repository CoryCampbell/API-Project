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
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
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

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch, user]);

  const newSpot = {
    ownerId: user.id,
    country,
    address,
    city,
    state,
    lat,
    lng,
    description,
    name: title,
    price,
    previewImage: imageMain
  };

  function ValidateCredentials() {
    const errorsObject = {};
    if (!country) errorsObject.country = "Country is required";
    if (!address) errorsObject.address = "Address is required";
    if (!city) errorsObject.city = "City is required";
    if (!state) errorsObject.state = "State is required";
    if (lat < -90 || lat > 90 || !lat) errorsObject.lat = "Latitude is Required";

    if (lng < -180 || lng > 180 || !lat) errorsObject.lng = "Longitude is Required";

    if (description.length < 30) errorsObject.description = "Description needs 30 or more characters";
    if (!title) errorsObject.title = "Name is required";
    if (!price) errorsObject.price = "Price is required";
    if (!imageMain) errorsObject.mainImage = "Preview image is required";

    setErrors(errorsObject);
    return;
  }

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
            <div className="createLabelAndErrorTop">
              Country
              {errors.country && <p className="errors countryError">{errors.country}</p>}
            </div>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </label>
          <label>
            <div className="createLabelAndErrorTop">
              Street Address
              {errors.address && <p className="errors addressError">{errors.address}</p>}
            </div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </label>
          <div className="cityAndState">
            <div className="cityLeftContainer">
              <label className="cityLabel">
                <div className="createLabelAndErrorTop">
                  City
                  {errors.city && <p className="errors cityError">{errors.city}</p>}
                </div>
                <input
                  type="text"
                  className="cityText"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </label>
              <p className="commaContainer">,</p>
            </div>
            <div className="cityRightContainer">
              <label className="stateLabel">
                <div className="createLabelAndErrorTop">
                  State
                  {errors.state && <p className="errors stateError">{errors.state}</p>}
                </div>
                <input
                  type="text"
                  className="stateText"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></input>
              </label>
            </div>
          </div>
          <div className="createLatAndLngContainer">
            <div className="latLeftContainer">
              <label className="latitudeLabel">
                <div className="createLabelAndErrorTop">
                  Latitude
                  {errors.lat && <p className="errors latError">{errors.lat}</p>}
                </div>
                <input
                  type="text"
                  className="latitudeText"
                  placeholder="11.111111"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                ></input>
              </label>
              <p className="commaContainer">,</p>
            </div>
            <div className="LngRightContainer">
              <label className="longitudeLabel">
                <div className="createLabelAndErrorTop">
                  Longitude
                  {errors.lng && <p className="errors lngError">{errors.lng}</p>}
                </div>
                <input
                  type="text"
                  className="longitudeText"
                  placeholder="-11.111111"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
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
          ></textarea>
          <div className="createLabelAndErrorBottom">
            {errors.description && <p className="errors descriptionError">{errors.description}</p>}
          </div>
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
          ></input>
          <div className="createLabelAndErrorBottom">
            {errors.title && <p className="errors titleError">{errors.title}</p>}
          </div>
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
            ></input>
          </div>
          <div className="createLabelAndErrorBottom">
            {errors.price && <p className="errors priceError">{errors.price}</p>}
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
          ></input>
          <div className="createLabelAndErrorBottom">
            {errors.mainImage && <p className="errors mainImageError">{errors.mainImage}</p>}
          </div>
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
          <button type="submit" className="createSpotButton" onClick={ValidateCredentials}>
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateASpot;
