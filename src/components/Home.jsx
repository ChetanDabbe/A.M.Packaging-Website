import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/home.css';
import Frame4 from './Frame4.jsx';
import Frame5 from './Frame5.jsx';
import Frame6 from './Frame6.jsx';
import Frame7 from './Frame7.jsx';
import Frame8 from './Frame8.jsx';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([]);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/products`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    function orderProducts() {
        navigate('/product');
    }

    const showProduct = () => {
        setShowAllProducts(!showAllProducts);
        navigate('/product');
    };

    const displayedProducts = showAllProducts ? products : products.slice(0, 5);

    return (
        <>
            <div className="navigation_bar">
                <Navbar />
            </div>

            <div className="frame2">
                <div className="frame2_cont">
                    <h1 style={{ textAlign: 'center', fontSize: '3rem' }}>Premium PET Bottles</h1>
                    <p style={{ marginTop: '-1rem' }}>Elevate your wine packaging with our high-quality, eco-friendly solutions</p>
                    <button>Explore Our Products</button>
                </div>
            </div>

            <div className="frame3">
                <h1>Explore Our Product</h1>
                <p style={{ width: '35vw', textAlign: 'center' }}>
                    Discover our premium PET wine bottles, designed to preserve flavor, reduce environmental impact, and enhance your brand.
                </p>

                <div className="products_bottle">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        displayedProducts.map((product) => (
                            <div key={product._id} className="product">
                                <div className="photo">
                                    <img src={`${process.env.REACT_APP_BACKEND_URI}/${product.image}`|| 'default.jpg'} alt={product.productName} />
                                </div>
                                <div className="product_content">
                                    <p>{product.productName}</p>
                                </div>
                                <div className="btn_order">
                                    <button className="order_btn" onClick={orderProducts}>Order Now</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <button onClick={showProduct} className="view_btn">
                    View all products
                </button>

                <Frame4 />
                <Frame5 />
                <Frame6 />
                <Frame7 />
                <Frame8 />
            </div>
        </>
    );
}

export default Home;
