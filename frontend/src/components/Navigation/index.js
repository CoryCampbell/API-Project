import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <>
            <ul className="fullNavBarContainer">
                <div className="navBarContent">
                    <NavLink exact to="/" className="logoDiv">
                        <i className="fa-brands fa-airbnb"></i>
                        <p className="airbnbText">airbnb</p>
                    </NavLink>
                    <div className="rightNavContainer">
                        {sessionUser && (
                            <NavLink to="/spots/new" className="createaspotLink">
                                Create A Spot
                            </NavLink>
                        )}
                        {isLoaded && (
                            <li className="drop-down-active">
                                <ProfileButton user={sessionUser} />
                            </li>
                        )}
                    </div>
                </div>
            </ul>
        </>
    );
}

export default Navigation;
