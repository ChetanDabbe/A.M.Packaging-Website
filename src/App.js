import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import AboutPage from "./components/AboutPage";
import Contact from "./components/ContactPage";
import AddProduct from "./components/AddProduct";
import LoginPageCust from "./components/LoginPageCust";
import SignUpPage from "./components/SignUpPage";
import AdminPage from "./components/AdminPage";
import CartPage from "./components/CartPage";
import CheckOutpage from "./components/CheckOutPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  // updateCart function to modify cart state
  const updateCart = (newCart) => setCart(newCart);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage updateCart={updateCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/product/login-page" element={<LoginPageCust />} />
          <Route path="/product/login-page/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/product/cart-page" element={<CartPage cartItems={cart} updateCart={updateCart} />} />
          <Route path="/product/cart-page/checkout-page" element={<CheckOutpage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
