import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/signUpPage.css";
import signup from "../assets/signUp.png";
import TermsAndConditions from "./TermsAndConditions"; 

function SignUpPage() {
  const [agree, setAgree] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setAgree(!agree);
  };

  const handleSignInPage = () => {
    navigate("/product/login-page");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSignUpSubmit=(e)=>{
    
  }

  return (
    <div className="create_account">
      <div className="signup_image_container">
        <img src={signup} alt="SignUp Illustration" className="signup_image" />
      </div>

      <div className="create_form_with_border">
        <h2>Create Account</h2>
        <p>Join A.M.Packaging to start ordering</p>

        <div className="create_form">
          <form onSubmit={handleSignUpSubmit}>
            <div className="input_group">
              <div>
                <label htmlFor="first_name" className="create-heading-label">
                  First Name
                </label>
                <input type="text" id="first_name" />
              </div>

              <div>
                <label htmlFor="last_name" className="create-heading-label">
                  Last Name
                </label>
                <input type="text" id="last_name" />
              </div>
            </div>

            <label htmlFor="company_name" className="create-heading-label">
              Company Name (Optional)
            </label>
            <input type="text" id="company_name" />

            <label htmlFor="email" className="create-heading-label">
              Email
            </label>
            <input type="email" id="email" placeholder="you@example.com" />

            <label htmlFor="mobile" className="create-heading-label">
              Mobile Number
            </label>
            <input type="text" id="mobile" placeholder="+91 XXXXX XXXXX" />

            <label htmlFor="password" className="create-heading-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password must contain alphabets, letter, symbols (Ex. @, &).."
            />

            <label htmlFor="confirm_password" className="create-heading-label">
              Confirm Password
            </label>
            <input type="password" id="confirm_password" />

            <div className="terms-and-conditions">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={handleCheckboxChange}
                />
                <span>
                  I agree to the{" "}
                  <button type="button" onClick={openModal} className="terms-link">
                    Terms & conditions
                  </button>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="account_create_button"
              disabled={!agree}
            >
              Create Account <FaArrowRight />
            </button>
          </form>
          <span className="already_sign_in">
            Already have an account?{" "}
            <button onClick={handleSignInPage} className="create-sign-in-btn">
              Sign in
            </button>
          </span>
        </div>
      </div>

      <TermsAndConditions isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default SignUpPage;
