import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import "../styles/loginPage_cust.css";
import user_login from "../assets/user_login.png";
import logo from "../assets/signUp.png";

function LoginPageCust() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userType, setUserType] = useState("user_login");
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      navigate("/product");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    navigate("/product/login-page/signup");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formLoginData.email,
          password: formLoginData.password,
          role: userType === "user_login" ? "user" : "admin",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt", data.token, { expires: 1 });
        Cookies.set("role", userType === "user_login" ? "user" : "admin", { expires: 2 }); 

        if (userType === "user_login") {
          alert(`Login Successful as User`);
          navigate("/product");
        } else if (userType === "admin_login") {
          alert(`Login Successful as Admin`);
          navigate("/admin");
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="customer_login_container">
      <div className="login_image_container">
        <img src={user_login} alt="Login Illustration" className="login_image" />
      </div>
      <div className="customer_login">
        <div className="logo_container">
          <img src={logo} alt="A.M. Packaging Logo" className="logo_image" />
          <h2 className="logo_heading">A.M. Packaging</h2>
        </div>
        <form className="login_form" onSubmit={handleLoginSubmit}>
          <h2 className="form_heading">Welcome Back</h2>
          <p className="form_subheading">Please enter your details to sign in</p>

          <div className="login_selection">
            <label htmlFor="userType" className="form_label">Login As</label>
            <select
              name="userType"
              id="userType"
              className="form_select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="user_login">👤 User Login</option>
              <option value="admin_login">🛡️ Admin Login</option>
            </select>
          </div>

          <label htmlFor="email" className="form_label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            className="form_input"
            value={formLoginData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password" className="form_label">Password</label>
          <div className="password_container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="form_input"
              value={formLoginData.password}
              onChange={handleInputChange}
              required
            />
            <span
              className="password_toggle"
              onClick={togglePasswordVisibility}
              aria-label="Toggle Password Visibility"
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
