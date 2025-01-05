import React from 'react';
import { useNavigate } from 'react-router-dom';  
import '../styles/frame5.css';
import { FaMapMarkerAlt } from 'react-icons/fa'; 

function Frame5() {
    const navigate = useNavigate(); 

    const openAbout = () => {
        navigate('/about'); 
    };

    return (
        <div className="frame5_container">
            <div className="frame5_photo">
                {}
            </div>

            <div className="frame5_about">
                <h2 style={{color:"#8b5cf6"}}>About A.M Packaging</h2>
                <p>Located in the heart of India's wine country, A.M. Packaging has been a pioneer in PET wine bottle manufacturing since 2005. Our state-of-the-art facility in Sinnar, Nashik, combines cutting-edge technology with a commitment to sustainability.</p>
                <p>We pride ourselves on delivering innovative packaging solutions that meet the evolving needs of the wine industry. Our team of experts works closely with wineries to ensure that our bottles not only preserve the quality of their wines but also enhance their brand image.</p>
                
                <p className="location" style={{color:"#8b5cf6", marginTop:'-1.2rem', marginBottom:'0.7rem'}}>
                    <FaMapMarkerAlt style={{ marginRight: '8px', color:"#8b5cf6" }} /> {}
                    Sinnar, Nashik, Maharashtra, India.
                </p>

                <button onClick={openAbout} style={{backgroundColor:"#8b5cf6", color:'white', padding:'0.5rem', borderRadius:'10px'}}>Learn More about us</button>
            </div>
        </div>
    );
}

export default Frame5;
