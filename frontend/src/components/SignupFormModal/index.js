import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useModal } from "../../context/Modal";

function SignupFormModal() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        setErrors({});
        return dispatch(
          sessionActions.signup({
            email,
            username,
            firstName,
            lastName,
            password
          })
        )
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              console.log("errors ======", data.errors);
              setErrors(data.errors);
            }
          });
      }
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    };

    return (
      <div className="signUpFormContainer">
        <h1 className="signupH1">Sign Up</h1>
        <form className="signupForm" onSubmit={handleSubmit}>
          <div className="emailAndUsername">
            <label className="signupLabel">
              Email
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            {errors.email && <p className="signupErrorMessage">{errors.email}</p>}
            <label className="signupLabel">
              Username
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            {errors.username && <p className="signupErrorMessage">{errors.username}</p>}
          </div>
          <div className="firstNameLastName">
            <label className="signupLabel">
              First Name
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            {errors.firstName && <p className="signupErrorMessage">{errors.firstName}</p>}
            <label className="signupLabel">
              Last Name
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            {errors.lastName && <p className="signupErrorMessage">{errors.lastName}</p>}
          </div>
          <div className="passwordCreation">
            <label className="signupLabel">
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {errors.password && <p className="signupErrorMessage">{errors.password}</p>}
            <label className="signupLabel">
              Confirm Password
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            {errors.confirmPassword && <p className="signupErrorMessage">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="signupButton"
            disabled={
              password.trim().length < 6 ||
              username.trim().length < 4 ||
              confirmPassword.trim().length < 6 ||
              email.trim().length < 1 ||
              firstName.trim().length < 1 ||
              lastName.trim().length < 1
            }
          >
            Sign Up
          </button>
        </form>
      </div>
    );
}

export default SignupFormModal;
