import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa"; 
import "../styles/loginPage_cust.css";
import user_login from "../assets/user_login.png";

function LoginPageCust() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = () => {
    navigate("/product/login-page/signup");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault(); 
    console.log("Login Successful");
    alert("Success");
  };

  return (
    <div className="customer_login_container">
      <div className="login_image_container">
        <img src={user_login} alt="Login Illustration" className="login_image" />
      </div>

      <div className="customer_login">
        <div className="logo_container">
          <img src="logo.png" alt="A.M Logo" className="logo_image" />
          <h2 className="logo_heading">A.M.Packaging</h2>
        </div>

        <form className="login_form" onSubmit={handleLoginSubmit}>
          <h2 className="form_heading">Welcome Back</h2>
          <p className="form_subheading">Please enter your details to sign in</p>

          <label htmlFor="email" className="form_label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="form_input"
            required
          />

          <label htmlFor="password" className="form_label">
            Password
          </label>
          <div className="password_container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="form_input"
              required
            />
            <span
              className="password_toggle"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="form_actions">
            <label className="remember_me">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forget-password" className="forgot_password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="submit_button">
            Sign In <FaArrowRight />
          </button>

          <p className="signup_text">
            Don't have an account?{" "}
            <button
              type="button"
              className="signup_link"
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPageCust;
