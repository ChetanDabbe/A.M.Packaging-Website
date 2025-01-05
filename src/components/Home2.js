import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/home.css';
import bottle1 from '../assets/bottle1.jpg';
import bottle2 from '../assets/bottle2.jpg';
import Frame4 from './Frame4.jsx';
import Frame5 from './Frame5.jsx';
import Frame6 from './Frame6.jsx';
import Frame7 from './Frame7.jsx';
import Frame8 from './Frame8.jsx';
import { useNavigate } from 'react-router-dom';  

function Home() {
    const [showAllProducts, setShowAllProducts] = useState(false);
    const navigate=useNavigate();
    const [products] = useState([
        {
            id: 1,
            name: '375ml PET Wine Bottle',
            imageUrl: bottle1,
            features: [
                'Lightweight and durable',
                'Perfect for wine packaging',
                'Eco-friendly material'
            ]
        },
        {
            id: 2,
            name: '1000ml Plastic Bottle',
            imageUrl: bottle2,
            features: [
                'Ideal for large beverages',
                'Sturdy and reusable',
                'BPA-free plastic'
            ]
        },
        {
            id: 3,
            name: '500ml PET Juice Bottle',
            imageUrl: bottle1,
            features: [
                'Compact and portable',
                'Crystal-clear visibility',
                'Leak-proof cap'
            ]
        },
        {
            id: 4,
            name: '750ml PET Soda Bottle',
            imageUrl: bottle2,
            features: [
                'Pressure-resistant',
                'Keeps carbonation intact',
                'Easy grip design'
            ]
        },
        {
            id: 5,
            name: '600ml PET Water Bottle',
            imageUrl: bottle1,
            features: [
                'Ergonomic shape',
                'Refillable and recyclable',
                'Odorless and tasteless'
            ]
        },
        {
            id: 6,
            name: '1500ml PET Oil Bottle',
            imageUrl: bottle2,
            features: [
                'High capacity',
                'Easy pour spout',
                'Ideal for cooking oils'
            ]
        },
        {
            id: 7,
            name: '1500ml PET Oil Bottle',
            imageUrl: bottle2,
            features: [
                'High capacity',
                'Easy pour spout',
                'Ideal for cooking oils'
            ]
        }
    ]);
    
    function order_products(){

        navigate('/product');
    }

    const showProduct = () => {
        setShowAllProducts(!showAllProducts);
    };

    const displayedProducts = showAllProducts ? products : products.slice(0, 5);

    return (
        <>
            <div className="navigation_bar">
                <Navbar />
            </div>

            <div className="frame2">
                <div className="frame2_cont">
                    <h1 style={{ textAlign: 'center', fontSize: '3rem' }}>Premium PET Wine Bottles</h1>
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
                    {displayedProducts.map((product) => (
                        <div key={product.id} className="product">
                            <div className="photo">
                                <img src={product.imageUrl || 'default.jpg'} alt={product.name} />
                            </div>
                            <div className="product_content">
                                <p>{product.name}</p>
                            </div>
                            <div className="btn_order">
                                <button className="order_btn" onClick={order_products}>Order Now</button>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={showProduct} className="view_btn">
                    {showAllProducts ? 'Show Less' : 'View All Products'}
                </button>

                <Frame4/>

                <Frame5/>
                <Frame6/>
                <Frame7/>
                <Frame8/>
            </div>
        </>
    );
}

export default Home;
