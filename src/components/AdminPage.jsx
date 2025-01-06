import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/adminPage.css"; 
function AdminPage() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (!token) {
      navigate("/login"); 
    } else {
      fetchProducts();
      fetchUsers();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        alert("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products");
    }
  };

  
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users"); 
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        alert("Error fetching users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users");
    }
  };

  return (
    <div className="admin-container">
      <h1>Welcome, Admin</h1>

      <div className="admin-dashboard">
        <section className="product-management">
          <h2>Manage Products</h2>
          <button className="add-product-btn" onClick={() => navigate("/add-product")}>
            Add New Product
          </button>

          <div className="products-list">
            <h3>Product List</h3>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.productName}</td>
                      <td>{product.price}</td>
                      <td>{product.capacity}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No products available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="user-management">
          <h2>Manage Users</h2>
          <div className="users-list">
            <h3>User List</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No users available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
