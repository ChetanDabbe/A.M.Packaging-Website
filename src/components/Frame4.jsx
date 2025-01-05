import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faDroplet, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/frame4.css';
function Frame4() {
  return (
    <>
    <h1 style={{marginTop:'4rem'}}>Why Choose Our bottles?</h1>
    <div className="frame4_card">
        <div className="card_one">
            <FontAwesomeIcon icon={faDroplet} size="2x" color="#8b5cf6" />
            <p style={{color:'#8b5cf6', fontWeight:'bold'}}>LightWeight</p>
            <p>Our PET bottles are up to 90% lighter than traditional glass, making them easier to transport and handle.</p>
        </div>

        <div className="card_one">
            <FontAwesomeIcon icon={faRecycle} size="2x" color="#8b5cf6" />
            <p style={{color:'#8b5cf6', fontWeight:'bold'}}>Recyclable</p>
            <p>Made from 100% recyclable materials, our bottles are an eco-friendly packaging solution for conscious consumers.</p>
        </div>

        <div className="card_one">
            <FontAwesomeIcon icon={faWineGlass} size="2x" color="#8b5cf6" />
            <p style={{color:'#8b5cf6', fontWeight:'bold'}}>Shatterproof</p>
            <p>Ideal for outdoor events and shipping, our PET bottles are virtually unbreakable, ensuring your wine arrives safely.</p>
        </div>
      
      
      
    </div>
    </>
  );
}

export default Frame4;
