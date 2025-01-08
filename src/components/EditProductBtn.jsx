import React, { useState } from "react";
import "../styles/editProductPage.css";

function EditProductBtn({ product, updateProductList, setShowEditProduct }) {
  const [productName, setProductName] = useState(product.productName);
  const [capacity, setCapacity] = useState(product.capacity);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    `http://localhost:5000/${product.image}`
  );
  const [features, setFeatures] = useState(product.features || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("capacity", capacity);
    formData.append("price", price);
    formData.append("features", features);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      const response = await fetch(`http://localhost:5000/update/${product._id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Product updated successfully");
  
        updateProductList(data.updatedProduct);
  
        setShowEditProduct(false);
      } else {
        const data = await response.json();
        alert(`Failed to update product: ${data.error}`);
      }
    } catch (error) {
      alert(`Error updating product: ${error.message}`);
    }
  };
  
  return (
    <div className="edit-product-container">
      <h3 className="edit-product-title">Edit Product</h3>
      <form onSubmit={handleSaveChanges} className="edit-product-form">
        <div className="image-upload-section">
          <img
            src={imagePreview}
            alt="Product Preview"
            className="product-image-preview"
          />
          <input
            type="file"
            id="product-image"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload-input"
          />
          <label htmlFor="product-image" className="image-upload-label">
            Change Image
          </label>
        </div>
        <div className="form-group-edit">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="form-group-edit">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="text"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="form-group-edit">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group-edit">
          <label htmlFor="features">Features</label>
          <textarea
            id="features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="button"
            className="cancel-button"
            onClick={() => setShowEditProduct(false)}
          >
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductBtn;
