import React from "react";
import "./AddButton.css";

const AddButton = ({ onClick, label }) => {
    return (
        <button className="add-button" onClick={onClick}>
            <span className="add-button__icon">+ Add</span>
        </button>
    );
}

export default AddButton;