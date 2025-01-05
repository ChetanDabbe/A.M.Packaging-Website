import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa'; 
import '../styles/productCard.css';

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="badge">{product.capacity}</div>
            <div className="image-placeholder">
                <img src={product.imageUrl || 'default.jpg'} alt={product.name} />
            </div>
            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ul className="features-list">
                    {product.features.map((feature, index) => (
                        <li key={index}>
                            <FaRegCheckCircle className="feature-icon" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <button className="learn-more-btn">Learn More</button>
            </div>
        </div>
    );
}

export default ProductCard;
