import React from "react";
import {useNavigate} from "react-router-dom";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import "../styles/cartPage.css";

function CartPage({ cartItems = [], updateCart }) {
  const calculateSubtotal = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  const handleIncrement = (id) => {
    updateCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    updateCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    updateCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };
  const navigate=useNavigate();
  const handleContinueShopping=()=>{
    navigate("/product");
  }

  const handleProceedToCheckout=()=>{
    navigate("/product/cart-page/checkout-page");
  }

  return (
    <div className="cartPage-container">
      <div className="cartPage-cont1">
        <FaShoppingCart size="1.5rem" color="#007bff" />
        <h3>Shopping Cart</h3>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="cartPage-cont2">
          {cartItems.map((item) => (
            <div key={item._id} className="cartPage-cont2-product">
              <div className="cartPage-cont2-image">
                <img
                  src={`http://localhost:5000/${item.image}`}
                  alt={item.productName}
                />
              </div>
              <div className="cartPage-cont2-product-detail">
                <div className="cartPage-product">
                  <p>{item.productName}</p>
                  <p>Rs {item.price}</p>
                  <div>
                  <button onClick={() => handleIncrement(item._id)}>+</button> &nbsp;
                  <span>{item.quantity}</span>&nbsp;
                  <button onClick={() => handleDecrement(item._id)}>-</button>
                  </div>
                  <FaTrashAlt size="1.5rem" onClick={() => handleRemove(item._id)} />
                  <div>Total: Rs {item.price * item.quantity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in cart</p>
      )}

      <div className="cartPage-order-summary">
        <h4>Order Summary</h4>
        <p>Subtotal: Rs {calculateSubtotal()}</p>
        <p>Tax (13%): Rs {calculateSubtotal() * 0.13}</p>
        <p>Total: Rs {calculateSubtotal() * 1.13}</p>
        <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default CartPage;
