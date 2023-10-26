import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SplashPage";
import SpotDetails from "./components/SpotDetails";
import SpotReviews from "./components/SpotReviews";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                    <Route exact path="/">
                        <AllSpots />
                    </Route>
                    <Route path="/spots/:spotId">
                        <SpotDetails />
                        <SpotReviews />
                    </Route>
                    <Route>"404: Not Found"</Route>
                </Switch>
            )}
        </>
    );
}

export default App;
