import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <>
            <ul className="fullNavBar">
                <NavLink exact to="/" className="logoDiv">
                    <i className="fa-brands fa-airbnb"></i>
                    <p className="airbnbText">airbnb</p>
                </NavLink>
                {isLoaded && (
                    <li className="drop-down-active">
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
        </>
    );
}

export default Navigation;
