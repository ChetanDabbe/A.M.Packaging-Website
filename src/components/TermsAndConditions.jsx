import React from "react";
import "../styles/termsAndConditions.css";

function TermsAndConditions({ isOpen, closeModal }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={closeModal} className="close-btn">X</button>
        <h2>Terms and Conditions</h2>
        <p style={{textAlign:"justify"}}>
        By accessing A.M. Packaging Company's website, you agree to our terms and conditions. We manufacture high-quality PET bottles with customizable options, subject to manufacturing tolerances. Prices are subject to change; confirm before ordering. Payments must align with invoice terms, with bulk orders requiring a 50% advance. Custom orders may involve extra charges and longer timelines. We are not liable for delays due to unforeseen circumstances, and defective product claims must be made within 7 days of delivery. Customer data is handled per our Privacy Policy. </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
