import React, { useState } from "react";
import { FaEyeSlash, FaEye, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/signUpPage.css";
import signup from "../assets/signUp.png";
import TermsAndConditions from "./TermsAndConditions";

function SignUpPage() {
  const [agree, setAgree] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formCreateData, setFormCreateData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormCreateData((prev) => ({ ...prev, [id]: value }));
  };

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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      firstName,
      lastName,
      companyName,
      email,
      mobile,
      password,
      confirmPassword,
    } = formCreateData;

    if (password !== confirmPassword) {
      alert("Password & confirm password are not matching");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          companyName,
          email,
          mobile,
          password,
        }),
      });

      // const result= await response.json();

      if (response.ok) {
        alert("Account Created Successfully");
        setTimeout(() => navigate("/product/login-page"), 2000);
      } else {
        alert("Failed to create account");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

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
                <input
                  type="text"
                  id="firstName"
                  value={formCreateData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="last_name" className="create-heading-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formCreateData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <label htmlFor="company_name" className="create-heading-label">
              Company Name (Optional)
            </label>
            <input
              type="text"
              id="companyName"
              value={formCreateData.companyName}
              onChange={handleInputChange}
            />

            <label htmlFor="email" className="create-heading-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={formCreateData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="mobile" className="create-heading-label">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              placeholder="+91 XXXXX XXXXX"
              value={formCreateData.mobile}
              onChange={handleInputChange}
            />

            {/* <label htmlFor="password" className="create-heading-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password must contain alphabets, letter, symbols (Ex. @, &).."
              value={formCreateData.password}
              onChange={handleInputChange}
            />

            <label htmlFor="confirm_password" className="create-heading-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formCreateData.confirmPassword}
              onChange={handleInputChange}
            /> */}

            <label htmlFor="password" className="form_label">
              Password
            </label>
            <div className="password_container_register">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password must contain alphabets, symbols (Ex. @, &).."
                value={formCreateData.password}
                onChange={handleInputChange}
                className="register_password"
                required
              />
              <span
                className="password_toggle_register"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label htmlFor="confirmPassword" className="form_label">
              Confirm Password
            </label>
            <div className="password_container_register">
              <input
                type={passwordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formCreateData.confirmPassword}
                onChange={handleInputChange}
                className="register_password"
                required
              />
              <span
                className="password_toggle_register"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="terms-and-conditions">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={handleCheckboxChange}
                />
                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={openModal}
                    className="terms-link"
                  >
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

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

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
