// ThankYouPopup.js
import React from "react";
import "./CSS/ThankYouPopup.css"; // Create a CSS file for styling

const ThankYouPopup = ({ onClose }) => {
  return (
    <div className="thank-you-popup">
      <h2>Thank You For Purchasing!</h2>
      <p>Your order has been successfully placed.</p>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ThankYouPopup;
