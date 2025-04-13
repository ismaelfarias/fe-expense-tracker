import React from "react";
import "./Header.css";
import Icone from "../assets/icon.svg";

const Header = () => {
    return (
        <div className="header">
            <img src={Icone} alt="Expense Tracker Icon" className="header-icon" />
            <h1 className="header__title">Expense Tracker</h1>
        </div>
    )
}

export default Header;