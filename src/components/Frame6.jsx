import React from 'react';
import { FaStar } from 'react-icons/fa';  
import '../styles/frame6.css';

function Frame6() {
  const renderStars = () => {
    return Array(5).fill(<FaStar style={{ color: '#FFD700', marginRight: '0.2rem' }} />);
    
  };

  return (
    <>
      <h1 className="frame6_title">What Our Clients Say</h1>
      <div className="frame6_container">
        <div className="card_frame6">
        <div className="star_rating">
            {renderStars()} {}
          </div>
          <p>
            "A.M. Packaging's PET bottles have revolutionized our wine packaging.
            They're lightweight, durable, and our customers love them!"
          </p>
          <p className="client_name">- Vineyard Vistas</p>
          
        </div>

        <div className="card_frame6">
        <div className="star_rating">
            {renderStars()} {}
          </div>
          <p>
            "The quality of A.M. Packaging's bottles is unmatched. They've helped us reduce breakage and shipping costs significantly."
          </p>
          <p className="client_name">- Sunset Cellars</p>
          
        </div>
      </div>
    </>
  );
}

export default Frame6;
