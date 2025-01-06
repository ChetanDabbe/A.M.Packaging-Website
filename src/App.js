import React, {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import AboutPage from './components/AboutPage';
import Contact from './components/ContactPage';
import AddProduct from './components/AddProduct';
import LoginPageCust from './components/LoginPageCust';
import SignUpPage from './components/SignUpPage';
import AdminPage from './components/AdminPage';
import './App.css';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/product" element={<ProductPage/>}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/add" element={<AddProduct/>}> </Route>
          <Route path="/product/login-page" element={<LoginPageCust/>}></Route>

          <Route path="/product/login-page/signup" element={<SignUpPage/>}></Route>

          <Route path="/admin" element={<AdminPage/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
