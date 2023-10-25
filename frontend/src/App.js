import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SplashPage";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SpotDetails from "./components/SpotDetails";

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
                    </Route>
                    <Route>"404: Not Found"</Route>
                </Switch>
            )}
        </>
    );
}

export default App;
