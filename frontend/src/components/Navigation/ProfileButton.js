import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push("/");
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div onClick={openMenu} className="dropdownMain">
                <i className="fa-solid fa-bars"></i>
                <button onClick={openMenu} className="userButton">
                    <i className="fas fa-user-circle" />
                </button>
            </div>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <div className="profileButton">
                        <li>
                            Hello, {user.firstName} {user.lastName}
                        </li>
                        <li>{user.email}</li>
                        <div className="userControls">
                            <NavLink className="manageSpotsButton" to="/spots/current">
                                <li className="manageSpots">Manage Spots</li>
                            </NavLink>
                            <li className="manageReviews">Manage Reviews</li>
                        </div>
                        <li>
                            <button className="logoutButton" onClick={logout}>
                                Log Out
                            </button>
                        </li>
                    </div>
                ) : (
                    <>
                        <div className="login">
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </div>
                        <div className="signup">
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
