import btl_img from '../assets/bottle1.jpg';
import '../styles/navbar.css';
function Navbar(){
    return (
    <>
        <div className="navbar">
            <div className="nav1">
                <div className='nav_img'>
                  <img src={btl_img} alt="" />  
                </div>
                
                <h2 style={{color:'purple'}}>A.M.Packaging</h2>
            </div>
            <div className="nav2">
                <a href="/">Home</a>
                <a href="/product">Products</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/add">Upload</a>
            </div>
        </div>
    </>
    );
}

export default Navbar;