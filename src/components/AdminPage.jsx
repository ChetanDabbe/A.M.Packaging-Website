import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/adminPage.css";
import Dashboard from "./Dashboard";
import AdminProductPage from "./AdminProductPage";
import AdminUser from "./AdminUser";
import AdminSetting from "./AdminSetting";

function AdminPage() {
  const [openMenu, setOpenMenu] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleMenuBtn = () => {
    setOpenMenu(!openMenu);
  };

  const navigate = useNavigate();
  const handleAdminPageLogout = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "products_admin":
        return <AdminProductPage />;
      case "users":
        return <AdminUser />;
      case "settings":
        return <AdminSetting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin_container">
      <div className={openMenu ? "admin_sidebar_open" : "admin_sidebar_close"}>
        <div className="admin_heading">
          {openMenu && <h3 className="admin_heading_open">A.M.Packaging</h3>}
          <FaBars
            style={{ fontSize: "24px", color: "white" }}
            className="menu_btn"
            onClick={handleMenuBtn}
          />
        </div>

        <div className={openMenu ? "admin_tabs" : "admin_tabs_close"}>
          <button onClick={() => setActiveTab("dashboard")}>
            <FaTachometerAlt /> {openMenu && "Dashboard"}
          </button>
          <button onClick={() => setActiveTab("products_admin")}>
            <FaBox /> {openMenu && "Products"}
          </button>
          <button onClick={() => setActiveTab("users")}>
            <FaUsers /> {openMenu && "Users"}
          </button>
          <button onClick={() => setActiveTab("settings")}>
            <FaCog /> {openMenu && "Settings"}
          </button>
          <button onClick={handleAdminPageLogout}>
            <FaSignOutAlt /> {openMenu && "Logout"}
          </button>
        </div>
      </div>
      <div className={`sidebar_menu_open ${!openMenu ? "collapsed" : ""}`}>
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminPage;
