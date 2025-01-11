import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../styles/adminUser.css";
import { FaSearch } from 'react-icons/fa'; 

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/user`);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery) ||
      (user.companyName && user.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers); 
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users_data.xlsx");
  };

  return (
    <div className="admin-user-container">
      <div className="admin-user-header">
        <h2>User Management</h2>
        <div className="admin-user-btn">
          <button className="blue-button" onClick={handleExport}>
            Export
          </button>
          <button className="blue-button">+ &nbsp; Add User</button>
        </div>
      </div>

      <div className="admin_user_search_bar">
        <div className="search-icon">
          <FaSearch size={18} style={{ color: 'black', marginRight: '10px' }} />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      <div className="admin-user-table-container">
        <table className="admin-user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.companyName || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUser;
