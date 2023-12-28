// PaymentBox.js
import React, { useState } from "react";
import "./CSS/PaymentBox.css";
import creditCardIcon from "../Components/Assets/visa.svg";
import closeIcon from "../Components/Assets/closeIcon.png";

const PaymentBox = ({ onClose , totalAmount}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  

  const isPersonalInfoComplete = firstName && lastName && email && city && zipCode && country;
  const isPaymentInfoComplete = currentPage === 2 && creditCardNumber && expiryDate && cvv;

  const handleNextPage = () => {
    if (currentPage === 1 && !isPersonalInfoComplete) {
      alert("Please fill in all personal information fields.");
      return;
    }

    if (currentPage === 2 && !isPaymentInfoComplete) {
      alert("Please fill in all payment information fields.");
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePaymentSubmit = () => {
    if (currentPage === 1 && !isPersonalInfoComplete) {
      alert("Please fill in all personal information fields.");
      return;
    }

    if (currentPage === 2 && !isPaymentInfoComplete) {
      alert("Please fill in all payment information fields.");
      return;
    }

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("City:", city);
    console.log("Country:", country);
    console.log("Zip Code:", zipCode);

    if (currentPage === 2) {
      console.log("Credit Card Number:", creditCardNumber);
      console.log("Expiry Date:", expiryDate);
      console.log("CVV:", cvv);
    }

    onClose();
  };

  const validateCreditCardNumber = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    const formattedValue = onlyNumbers.slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    setCreditCardNumber(formattedValue);
  };

  const validateExpiryDate = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    const formattedValue = onlyNumbers.slice(0, 4).replace(/(.{2})/, "$1/");
    setExpiryDate(formattedValue);
  };

  const validateCvv = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    setCvv(onlyNumbers.slice(0, 3));
  };

  return (
    <div className="payment-box">
      <button className="close-button" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </button>

      <h2>{currentPage === 1 ? "Personal Information" : "Add Payment Method"}</h2>

      {currentPage === 1 && (
        <>
          <div className="input-group">
            <div className="input-half">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>
            <div className="input-half">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="input-group">
            <div className="input-half">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="input-half">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Zip Code"
              />
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </div>
          <div className="navigation-buttons">
            <button
              className="action-button"
              onClick={handleNextPage}
              disabled={!isPersonalInfoComplete}
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentPage === 2 && (
        <>
          <div className="input-group">
            <input
              type="text"
              value={creditCardNumber}
              onChange={(e) => validateCreditCardNumber(e.target.value)}
              placeholder={`XXXX-XXXX-XXXX-XXXX`}
              style={{
                backgroundImage: `url(${creditCardIcon})`,
                backgroundSize: "20px 20px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "5px center",
                paddingLeft: "30px",
              }}
            />
          </div>

          <div className="input-group">
            <div className="input-half">
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => validateExpiryDate(e.target.value)}
                placeholder="Expiry Date (MM/YY)"
              />
            </div>

            <div className="input-half">
              <input
                type="text"
                value={cvv}
                onChange={(e) => validateCvv(e.target.value)}
                placeholder="CVV"
              />
            </div>
            <div className="navigation-buttons">
              <button className="action-button" onClick={handlePreviousPage}>
                Previous
              </button>
              <button
        className="action-button"
        onClick={handlePaymentSubmit}
        disabled={!isPaymentInfoComplete}
      >
        Pay ${totalAmount}
      </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default PaymentBox;
