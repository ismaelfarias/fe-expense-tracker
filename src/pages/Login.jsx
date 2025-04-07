import React from "react";
import './login.css';
import multipleStopIcon from '../assets/icon.svg';

const Login = () => {
    return (
        <>
        <div className="login-page">
            <img src={multipleStopIcon} alt="App Icon" className="login-icon" />
            <h1>Expense Tracker</h1>
        </div>
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit"className="login-button">Login</button>
                </form>
            </div>
        </div>
        </>
    )
};

export default Login;