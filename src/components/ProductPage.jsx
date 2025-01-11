import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/ProductPage.css";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import Navbar from "./Navbar";

function ProductPage({ updateCart }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); 

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/products`);
      const data = await response.json();
      setProducts(data);

      const initialQuantities = {};
      data.forEach((product) => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    const token = Cookies.get("jwt");
    const userRole = Cookies.get("role"); // Getting user role from cookies
    if (token) {
      setIsLoggedIn(true);
    }
    if (userRole) {
      setRole(userRole); // Setting user role to either "admin" or "user"
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("role");
    setIsLoggedIn(false);
    setRole(""); // Clearing user role on logout
    navigate("/product");
  };

  const openLoginInPage = () => {
    navigate("/product/login-page");
  };

  const incrementQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const decrementQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      if (typeof updateCart === "function") {
        console.log("Update cart function is valid.");
        updateCart((prevCart) => {
          const existingItem = prevCart.find(
            (item) => item._id === product._id
          );

          if (existingItem) {
            console.log("Product already in cart. Updating quantity.");
            return prevCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          alert("Product added to cart");
          return [...prevCart, { ...product, quantity: 1 }];
        });
      } else {
        console.error("updateCart is not a function");
      }
    } else {
      alert("Please log in to add items to the cart.");
      navigate("/product/login-page");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toUpperCase().includes(searchTerm.toUpperCase())
  );

  return (
    <>
      <Navbar />
      <div className="search_product_cont">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="action-buttons">
          {isLoggedIn ? (
            <>
              {role === "admin" ? (
                <button
                  className="icon-button"
                  onClick={() => navigate("/admin")}
                >
                  <FaUser className="icon" /> Admin Panel
                </button>
              ) : (
                <button className="icon-button" onClick={handleLogout}>
                  <FaUser className="icon" /> Logout
                </button>
              )}
            </>
          ) : (
            <button className="icon-button" onClick={openLoginInPage}>
              <FaUser className="icon" /> Login
            </button>
          )}
          <button
            className="icon-button"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/product/cart-page");
              } else {
                alert("Please log in to access the cart.");
                navigate("/product/login-page");
              }
            }}
          >
            <FaShoppingCart className="icon" /> Cart
          </button>
        </div>
      </div>

      <div className="product_images">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product_card">
              <div className="fetch_image">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URI}/${product.image}`}
                  alt={product.productName}
                  className="product_image"
                />
              </div>
              <div className="fetch_product_detail">
                <h3 className="product_name">{product.productName}</h3>
                <p
                  className="product_price"
                  style={{ color: "green", fontWeight: "bold" }}
                >
                  Rs. {product.price}
                </p>
                <ul className="product_features">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="product_quantity">
                  <label htmlFor={`quantity-${product._id}`}>Quantity:</label>
                  <div className="quantity_selector">
                    <button
                      className="quantity_button"
                      onClick={() => decrementQuantity(product._id)}
                    >
                      –
                    </button>
                    &nbsp;
                    <span className="quantity_value">
                      {quantities[product._id]}
                    </span>
                    &nbsp;
                    <button
                      className="quantity_button"
                      onClick={() => incrementQuantity(product._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="product_buttons">
                  <button
                    className="buy_now_btn"
                    style={{ backgroundColor: "black" }}
                  >
                    Buy Now
                  </button>
                  <button
                    className="add_to_cart_btn"
                    style={{
                      backgroundColor: "white",
                      color: "#0056b3",
                      border: "2px solid silver",
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no_products_message">No products found.</p>
        )}
      </div>
    </>
  );
}

export default ProductPage;
