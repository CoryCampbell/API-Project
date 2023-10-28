import React, { useState } from "react";
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
        <form onSubmit={handleSubmit} className="loginForm">
            <label className="loginLabel">
                Username or Email
                <input
                    className="loginInput"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label className="loginLabel">
                Password
                <input
                    className="loginInput"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            {errors.message && <p className="loginErrorMessage">{errors.message}</p>}
            <button type="submit" className="loginButton">
                Log In
            </button>
            <button className="demoUserButton" onClick={demoUser}>
                Demo User
            </button>
        </form>
    </div>
);
}
export default LoginFormModal;
