// import React, { useState, useEffect } from "react";
// import "../styles/adminProductPage.css";

// function AdminProductPage() {
//   const [productsAdmin, setProductsAdmin] = useState([]);

//   const fetchProductAdmin = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/products");
//       const data = await response.json();
//       setProductsAdmin(data);
//     } catch (error) {
//       console.log("Error fetching products", error);
//     }
//   };

//   const adminAddProduct=()=>{
    
//   }

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
//           <button className="admin_add_product_btn" onClick={adminAddProduct}>
//             +&nbsp;&nbsp; Add Product
//           </button>
//         </div>

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
//                       <button className="edit_btn">Edit</button>
//                       <button className="delete_btn">Delete</button>
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
import "../styles/adminProductPage.css";
import AddProduct from "./AddProduct";

function AdminProductPage() {
  const [productsAdmin, setProductsAdmin] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const fetchProductAdmin = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      setProductsAdmin(data);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  const toggleAddProduct = () => {
    setShowAddProduct((prevState) => !prevState);
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
                          src={`http://localhost:5000/${product.image}`}
                          alt={product.productName}
                          className="admin_product_image"
                        />
                      </div>
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.capacity}</td>
                    <td>₹{product.price}</td>
                    <td>
                      <button className="edit_btn">Edit</button>
                      <button className="delete_btn">Delete</button>
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
