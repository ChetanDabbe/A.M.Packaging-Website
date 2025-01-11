// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";

// import "../styles/adminProductPage.css";
// import AddProduct from "./AddProduct";
// import EditProductBtn from "./EditProductBtn";

// function AdminProductPage() {
//   const [productsAdmin, setProductsAdmin] = useState([]);
//   const [showAddProduct, setShowAddProduct] = useState(false);
//   const [showEditProduct, setShowEditProduct] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const fetchProductAdmin = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/products");
//       const data = await response.json();
//       setProductsAdmin(data);
//     } catch (error) {
//       console.log("Error fetching products", error);
//     }
//   };

//   const toggleAddProduct = () => {
//     setShowAddProduct((prevState) => !prevState);
//   };

//   const toggleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setShowEditProduct((prevState) => !prevState);
//   };

//   const handleDeleteProduct = async (productId) => {
// 	const confirmDelete = window.confirm("Are you sure you want to delete the selected product?");
// 	if (confirmDelete) {
// 	  try {
// 		const response = await fetch(`http://localhost:5000/delete/${productId}`, {
// 		  method: "DELETE",
// 		  credentials: "include",  
// 		  headers: {
// 			"Content-Type": "application/json",
// 		  },
// 		});
  
// 		if (response.ok) {
// 		  alert("Product deleted successfully");
// 		  // Remove the deleted product from the local state without fetching again
// 		  setProductsAdmin(productsAdmin.filter(product => product._id !== productId));
// 		} else {
// 		  const errorData = await response.json();
// 		  alert(`Failed to delete product: ${errorData.error || 'Unknown error'}`);
// 		}
// 	  } catch (error) {
// 		alert(`Error deleting product: ${error.message}`);
// 	  }
// 	}
//   };
	

//   useEffect(() => {
//     fetchProductAdmin();
//   }, []);

//   return (
//     <div className="admin_product_page_container">
//       <div className="admin_product_cont1">
//         <h2>Products</h2>
//       </div>

//       <div className="admin_product_cont_back">
//         <div className="admin_product_cont2">
//           <h3>Product Management</h3>
//           <button
//             className="admin_add_product_btn"
//             onClick={toggleAddProduct}
//           >
//             +&nbsp;&nbsp; Add Product
//           </button>
//         </div>

//         {showAddProduct && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <button
//                 className="close-btn"
//                 onClick={toggleAddProduct}
//               >
//                 &times;
//               </button>
//               <AddProduct />
//             </div>
//           </div>
//         )}

//         {showEditProduct && selectedProduct && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <button
//                 className="close-btn"
//                 onClick={() => setShowEditProduct(false)}
//               >
//                 &times;
//               </button>
//               <EditProductBtn product={selectedProduct} />
//             </div>
//           </div>
//         )}

//         <div className="admin_product_table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Product Image</th>
//                 <th>Product Name</th>
//                 <th>Capacity</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {productsAdmin.length > 0 ? (
//                 productsAdmin.map((product) => (
//                   <tr key={product._id}>
//                     <td>
//                       <div className="admin_product_image_container">
//                         <img
//                           src={`http://localhost:5000/${product.image}`}
//                           alt={product.productName}
//                           className="admin_product_image"
//                         />
//                       </div>
//                     </td>
//                     <td>{product.productName}</td>
//                     <td>{product.capacity}</td>
//                     <td>₹{product.price}</td>
//                     <td>
//                     <div class="edit_delete_btn_container">

//                       <button
//                         className="edit_btn"
//                         onClick={() => toggleEditProduct(product)}
//                       >
//                         <FaEdit /> Edit
//                       </button>
//                       <button
//                         className="delete_btn"
//                         onClick={() => handleDeleteProduct(product._id)}
//                       >
//                         <FaTrash /> Delete
//                       </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="no_products_message">
//                     No products found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminProductPage;
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import "../styles/adminProductPage.css";
import AddProduct from "./AddProduct";
import EditProductBtn from "./EditProductBtn";

function AdminProductPage() {
  const [productsAdmin, setProductsAdmin] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProductAdmin = async () => {
    try {
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/products`);
      const data = await response.json();
      setProductsAdmin(data);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  const toggleAddProduct = () => {
    setShowAddProduct((prevState) => !prevState);
  };

  const toggleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProduct((prevState) => !prevState);
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete the selected product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/delete/${productId}`, {
          method: "DELETE",
          credentials: "include",  
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("Product deleted successfully");
          // Remove the deleted product from the local state without fetching again
          setProductsAdmin(productsAdmin.filter(product => product._id !== productId));
        } else {
          const errorData = await response.json();
          alert(`Failed to delete product: ${errorData.error || 'Unknown error'}`);
        }
      } catch (error) {
        alert(`Error deleting product: ${error.message}`);
      }
    }
  };

  const updateProductInList = (updatedProduct) => {
    setProductsAdmin((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  useEffect(() => {
    fetchProductAdmin();
  }, []);

  return (
    <div className="admin_product_page_container">
      <div className="admin_product_cont1">
        <h2>Products</h2>
      </div>

      <div className="admin_product_cont_back">
        <div className="admin_product_cont2">
          <h3>Product Management</h3>
          <button
            className="admin_add_product_btn"
            onClick={toggleAddProduct}
          >
            +&nbsp;&nbsp; Add Product
          </button>
        </div>

        {showAddProduct && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-btn"
                onClick={toggleAddProduct}
              >
                &times;
              </button>
              <AddProduct />
            </div>
          </div>
        )}

        {showEditProduct && selectedProduct && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-btn"
                onClick={() => setShowEditProduct(false)}
              >
                &times;
              </button>
              <EditProductBtn product={selectedProduct} updateProductList={updateProductInList}  setShowEditProduct={setShowEditProduct}/>
            </div>
          </div>
        )}

        <div className="admin_product_table">
          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsAdmin.length > 0 ? (
                productsAdmin.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="admin_product_image_container">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URI}/${product.image}`}
                          alt={product.productName}
                          className="admin_product_image"
                        />
                      </div>
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.capacity}</td>
                    <td>₹{product.price}</td>
                    <td>
                      <div className="edit_delete_btn_container">
                        <button
                          className="edit_btn"
                          onClick={() => toggleEditProduct(product)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="delete_btn"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no_products_message">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProductPage;
