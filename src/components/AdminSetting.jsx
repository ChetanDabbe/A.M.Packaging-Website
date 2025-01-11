import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/adminSetting.css";
import Cookies from 'js-cookie';

function AdminSetting() {
  const [currentView, setCurrentView] = useState("changePassword");

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const [adminFormData, setAdminFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChangeView = (view) => {
    setCurrentView(view);
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    });
    setAdminFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordFormData;
  
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
  
    const data = {
      currentPassword,
      newPassword,
    };
  
    try {
      const token = Cookies.get("token");  
  
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/updateAdminpassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert("Password updated successfully!");
        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          showCurrentPassword: false,
          showNewPassword: false,
          showConfirmPassword: false,
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error updating password!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the password.");
    }
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const { firstName, lastName, companyName, email, mobile, password, confirmPassword } = adminFormData;

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match!");
      return;
    }

    alert(`New Admin added: ${firstName} ${lastName}, ${companyName}, ${email}, ${mobile}`);
  };

  const togglePasswordVisibility = (field) => {
    setPasswordFormData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };

  return (
    <div className="admin_setting_container">
      <div className="admin-setting-btn">
        <button onClick={() => handleChangeView("changePassword")}>Change Password</button>
        <button onClick={() => handleChangeView("addNewAdmin")}>Add New Admin</button>
      </div>

      <div className="admin_setting_content">
        {currentView === "changePassword" && (
          <div className="admin_setting_change_password_cont">
            <h3 className="admin-setting-heading">Change Password</h3>
            <form onSubmit={handleChangePassword} className="admin-setting-form">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="password-input">
                <input
                  type={passwordFormData.showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordFormData.currentPassword}
                  placeholder="Enter current password"
                  onChange={handlePasswordInputChange}
                  required
                />
                <span className="eye-icon" onClick={() => togglePasswordVisibility('showCurrentPassword')}>
                  {passwordFormData.showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label htmlFor="newPassword">New Password</label>
              <div className="password-input">
                <input
                  type={passwordFormData.showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordFormData.newPassword}
                  placeholder="Enter new password"
                  onChange={handlePasswordInputChange}
                  required
                />
                <span className="eye-icon" onClick={() => togglePasswordVisibility('showNewPassword')}>
                  {passwordFormData.showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <p>Password must contain:</p>
              <ul className="admin-setting-list">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>

              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="password-input">
                <input
                  type={passwordFormData.showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordFormData.confirmPassword}
                  placeholder="Confirm new password"
                  onChange={handlePasswordInputChange}
                  required
                />
                <span className="eye-icon" onClick={() => togglePasswordVisibility('showConfirmPassword')}>
                  {passwordFormData.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button type="submit">Update Password</button>
            </form>
          </div>
        )}

        {currentView === "addNewAdmin" && (
          <div className="admin_setting_add_new_admin_cont">
            <h3 className="admin-setting-heading">Add New Admin</h3>
            <form onSubmit={handleAddAdmin} className="admin-setting-form">
              <div className="admin-form-row">
                <div className="admin-form-col">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={adminFormData.firstName}
                    placeholder="Enter first name"
                    onChange={handleAdminInputChange}
                    required
                  />
                </div>
                <div className="admin-form-col">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={adminFormData.lastName}
                    placeholder="Enter last name"
                    onChange={handleAdminInputChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={adminFormData.companyName}
                placeholder="Enter company name"
                onChange={handleAdminInputChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={adminFormData.email}
                placeholder="Enter email address"
                onChange={handleAdminInputChange}
                required
              />

              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={adminFormData.mobile}
                placeholder="Enter mobile number"
                onChange={handleAdminInputChange}
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={adminFormData.showPassword ? "text" : "password"}
                  name="password"
                  value={adminFormData.password}
                  placeholder="Enter password"
                  onChange={handleAdminInputChange}
                  required
                />
                <span className="eye-icon" onClick={() => setAdminFormData({ ...adminFormData, showPassword: !adminFormData.showPassword })}>
                  {adminFormData.showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={adminFormData.showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={adminFormData.confirmPassword}
                  placeholder="Confirm password"
                  onChange={handleAdminInputChange}
                  required
                />
                <span className="eye-icon" onClick={() => setAdminFormData({ ...adminFormData, showConfirmPassword: !adminFormData.showConfirmPassword })}>
                  {adminFormData.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button type="submit">Add Admin</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSetting;
