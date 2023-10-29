import "./CreateASpot.css";

function CreateASpot() {
    return (
        <div className="createaspotContainer">
            <form className="createaspotForm">
                <div className="locationInfoContainer">
                    <h1>Create A Spot</h1>
                    <h2>Where's your place located?</h2>
                    <h3>Guests will only get your exact address once they've booked a reservation.</h3>
                    <label>
                        Country
                        <input type="text" placeholder="Country"></input>
                    </label>
                    <label>
                        Street Address
                        <input type="text" placeholder="Address"></input>
                    </label>
                    <div className="cityAndState">
                        <label>
                            City
                            <input type="text" placeholder="City"></input>
                        </label>
                        <label>
                            State
                            <input type="text" placeholder="State"></input>
                        </label>
                    </div>
                </div>
                <div className="descriptionContainer">
                    <h2>Describe your place to guests</h2>
                    <h3>
                        Mention the best features of your space, any special amentities like fast wifi or parking, and
                        what you love about the neighborhood.
                    </h3>
                    <textarea
                        className="descriptionTextarea"
                        placeholder="Please write at least 30 characters"
                    ></textarea>
                </div>
                <div className="titleInfoContainer">
                    <h2>Create a title for your spot</h2>
                    <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
                    <input type="text" className="titleText" placeholder="Name of your spot"></input>
                </div>
                <div className="priceInfoContainer">
                    <h2>Set a base price for your spot</h2>
                    <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                    <div className="priceInfoLineContainer">
                        <p className="dollaSign">$</p>
                        <input type="text" className="priceInfoText" placeholder="Price per night (USD)"></input>
                    </div>
                </div>
                <div className="photosInfoContainer">
                    <h2>Liven up your spot with photos</h2>
                    <h3>Submit a link to at least one photo to publish your spot.</h3>
                    <input type="text" className="imageText" placeholder="Preview Image URL"></input>
                    <input type="text" className="imageText" placeholder="Image URL"></input>
                    <input type="text" className="imageText" placeholder="Image URL"></input>
                    <input type="text" className="imageText" placeholder="Image URL"></input>
                    <input type="text" className="imageText" placeholder="Image URL"></input>
                </div>
                <div className="submitContainer">
                    <button className="createSpotButton">Create Spot</button>
                </div>
            </form>
        </div>
    );
}

export default CreateASpot;
