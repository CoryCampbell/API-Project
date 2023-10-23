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
                <div>
                    <i className="fa-brands fa-airbnb">
                        <p className="airbnb">airbnb</p>
                    </i>
                </div>
                <div className="dropdownMain">
                    <li>
                        <NavLink exact to="/">
                            Home
                        </NavLink>
                    </li>
                    {isLoaded && (
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    )}
                </div>
            </ul>
        </>
    );
}

export default Navigation;
