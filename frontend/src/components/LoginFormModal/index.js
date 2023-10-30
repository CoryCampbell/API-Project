import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors(data);
                }
            });
    };

    const demoUser = () => {
        setCredential("DemoUserDownBad");
        setPassword("password");
    };

    return (
      <div className="loginContainer">
        <h1 className="loginH1">Log In</h1>
        {errors.message && <p className="loginErrorMessage">{errors.message}</p>}
        <form onSubmit={handleSubmit} className="loginForm">
          <label className="loginLabel">
            Username or Email
            <input
              className="loginInput"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </label>
          <label className="loginLabel">
            Password
            <input
              className="loginInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="loginButton" disabled={credential.length < 4 || password.length < 6}>
            Log In
          </button>
          <button className="demoUserButton" onClick={demoUser}>
            Log in as Demo User
          </button>
        </form>
      </div>
    );
}
export default LoginFormModal;
