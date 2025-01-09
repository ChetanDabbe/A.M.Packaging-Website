import React from "react";
import "../styles/checkOutPage.css";

function CheckOutPage() {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
      amount: 100 * 100, // Amount in paise (e.g., 100 INR = 10000 paise)
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png", // Optional
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Add further backend logic here (e.g., saving the transaction)
      },
      prefill: {
        name: "John Doe", // You can dynamically set user details
        email: "johndoe@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "123 Royal Villa, Nashik",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="checkout-page-container">
      <h3 style={{ textAlign: "center" }}>Checkout Form</h3>

      <div className="checkout-cont1">
        <h3>Billing address</h3>
        <div className="checkout-cont1-input-group">
          <div className="input-first-last">
            <label htmlFor="#">First name</label>
            <input type="text" />
          </div>

          <div className="input-first-last">
            <label htmlFor="#">Last name</label>
            <input type="text" />
          </div>
        </div>

        <div className="checkout-cont2">
          <div className="checkout-input-cont2">
            <label htmlFor="#">Username</label>
            <input type="text" placeholder="Username" />
          </div>

          <div className="checkout-input-cont2">
            <label htmlFor="#">Email</label>
            <input type="text" placeholder="you@example.com" />
          </div>

          <div className="checkout-input-cont2">
            <label htmlFor="#">Address</label>
            <input type="text" placeholder="Ex. 123 Royal Villa, Nashik" />
          </div>

          <div className="checkout-input-cont2">
            <label htmlFor="#">PinCode</label>
            <input type="text" placeholder="Ex. 422003" />
          </div>
        </div>
        <div className="checkout-cont3">
          <h3>Payment</h3>
          <div className="checkout-cont3-checkbox">
            <input type="checkbox" />
            <p>Online payment</p>

            <input type="checkbox" />
            <p>Cash On Delivery (COD)</p>
          </div>
        </div>

        <button className="pay-now-btn" onClick={handlePayment}>
          Pay now
        </button>
      </div>
    </div>
  );
}

export default CheckOutPage;
