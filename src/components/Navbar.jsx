import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import btl_img from '../assets/bottle1.jpg';
import '../styles/navbar.css';

function Navbar() {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <div className="navbar">
            <div className="nav1">
                <div className='nav_img'>
                    <img src={btl_img} alt="Logo" />
                </div>
                <h2>A.M.Packaging</h2>
            </div>
            <button className="menu-btn" onClick={toggleMenu}>
                <FaBars />
            </button>
            <div className={`nav2 ${menuActive ? 'active' : ''}`}>
                <a href="/">Home</a>
                <a href="/product">Products</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/add">Upload</a>
            </div>
        </div>
    );
}

export default Navbar;
