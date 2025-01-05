import React, { useState } from "react";
import axios from "axios";
import "../styles/addProduct.css";

function AddProduct() {
  const [features, setFeatures] = useState([""]);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    capacity: "",
    productImage: null,
  });

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const addFeatureField = () => {
    setFeatures([...features, ""]);
  };

  const removeFeatureField = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 500 * 1024;

    if (file && file.size <= maxSize) {
      setFormData({ ...formData, productImage: file });
    } else {
      e.target.value = "";
      alert("File size is too large (maximum 500KB).");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("price", formData.price);
      data.append("capacity", formData.capacity);
      data.append("features", JSON.stringify(features));
      if (formData.productImage) {
        data.append("productImage", formData.productImage);
      }

      const response = await axios.post("http://localhost:5000/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
    } catch (error) {
      alert("Error uploading product: " + error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="admin_container">
      <div className="admin_cont1">
        <form onSubmit={handleSubmit}>
          <h2>Add New Product</h2>

          <label htmlFor="productName" className="admin_heading_label">
            Product Name
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            placeholder="Enter product name"
            className="admin_input"
            value={formData.productName}
            onChange={handleChange}
          />

          <label htmlFor="price" className="admin_heading_label">
            Price (Rs.)
          </label>
          <input
            id="price"
            name="price"
            type="text"
            placeholder="Enter price"
            className="admin_input"
            value={formData.price}
            onChange={handleChange}
          />

          <label htmlFor="capacity" className="admin_heading_label">
            Capacity
          </label>
          <input
            id="capacity"
            name="capacity"
            type="text"
            placeholder="e.g., 150ml"
            className="admin_input"
            value={formData.capacity}
            onChange={handleChange}
          />

          <label className="admin_heading_label">Features</label>
          {features.map((feature, index) => (
            <div key={index} className="feature-field">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="admin_input feature-input"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="remove-feature-btn"
                  onClick={() => removeFeatureField(index)}
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-feature-btn"
            onClick={addFeatureField}
          >
            + Add Feature
          </button>

          <label htmlFor="productImage" className="admin_heading_label">
            Product Image
          </label>
          <input
            id="productImage"
            name="productImage"
            type="file"
            className="admin_input"
            onChange={handleFileChange}
            accept="image/*"
          />

          <button type="submit" className="save-btn">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
