import React from 'react';
import './FormModal.css';

const FormModal = ({ title, children, onClose, onSave }) => {
  return (
    <div className="form-modal">
      <div className="form-container">
        <h2>{title}</h2>
        {children}
        <div className="form-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;