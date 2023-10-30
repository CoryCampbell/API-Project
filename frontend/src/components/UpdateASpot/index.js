import { fetchSpotDetails, updateASpot, createImage } from "../../store/spots";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./UpdateASpot.css";

function UpdateASpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const [errors, setErrors] = useState({});

  const spot = useSelector((state) => state.spots.thisSpot);

  console.log("spot", spot);

  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    setAddress(spot?.address || "");
    setCountry(spot?.country || "");
    setCity(spot?.city || "");
    setState(spot?.state || "");
    setDescription(spot?.description || "");
    setName(spot?.name || "");
    setPrice(spot?.price || 0);
    setLat(spot?.lat || 1);
    setLng(spot?.lng || 1);
  }, [spot]);

  const submitUpdate = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!country) errors.country = "Country is required";
    if (!state) errors.state = "State is required";
    if (!name) errors.name = "Name is required";
    if (name && name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!description && description.length < 30) errors.description = "Description is required";
    if (!price) errors.price = "Price per day is required";
    if (!lng) errors.lng = "Longitude is required";
    if (!lat) errors.lat = "Latitude is required";

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const updatedSpot = {
        id: spot.id,
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        lat,
        lng
      };

      const response = await dispatch(updateASpot(updatedSpot));
      if (response) {
        history.push(`/spot/${response.id}`);
      }
    } else console.log(errors);
  };

  return (
    <div className="createaspotContainer">
      <form className="createaspotForm" onSubmit={submitUpdate}>
        <div className="locationInfoContainer">
          <h1>Update your Spot</h1>
          <h2>Where's your place located?</h2>
          <h4>Guests will only get your exact address once they've booked a reservation.</h4>
          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            ></input>
          </label>
          {errors.country && <div className="error">{errors.country}</div>}
          <label>
            Street Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            ></input>
          </label>
          <div className="cityAndState">
            <div className="cityLeftContainer">
              <label className="cityLabel">
                City
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="cityText"
                  placeholder="City"
                ></input>
              </label>
              <p className="commaContainer">,</p>
            </div>
            <div className="cityRightContainer">
              <label className="stateLabel">
                State
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="stateText"
                  placeholder="State"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          ></textarea>
        </div>
        <div className="titleInfoContainer">
          <h2>Create a title for your spot</h2>
          <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="titleText"
            placeholder="Name of your spot"
          ></input>
        </div>
        <div className="priceInfoContainer">
          <h2>Set a base price for your spot</h2>
          <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
          <div className="priceInfoLineContainer">
            <p className="dollaSign">$</p>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="priceInfoText"
              placeholder="Price per night (USD)"
            ></input>
          </div>
        </div>
        <div className="photosInfoContainer">
          <h2>Liven up your spot with photos</h2>
          <h4>Submit a link to at least one photo to publish your spot.</h4>
          <input type="text" className="imageText" placeholder="Preview Image URL"></input>
          <input type="text" className="imageText" placeholder="Image URL"></input>
          <input type="text" className="imageText" placeholder="Image URL"></input>
          <input type="text" className="imageText" placeholder="Image URL"></input>
          <input type="text" className="imageText" placeholder="Image URL"></input>
        </div>
        <div className="submitContainer">
          <button className="createSpotButton">Update your Spot</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateASpot;
