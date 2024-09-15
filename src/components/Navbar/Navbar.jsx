import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(prevState => !prevState);
  };

  const handleMenuClick = (menuItem, path) => {
    setMenu(menuItem);
    setIsNavOpen(false);
    if (path) {
      navigate(path);
      window.scrollTo(0, 0); // Scrolls to top when navigating to a new page
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0); // Scrolls to top when logo is clicked
    setMenu('home');
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Click the logo or Foodies text to go to the top of the homepage */}
        <a onClick={handleLogoClick} className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
          <span className="navbar-logo-text">
            Food<span className="highlight">ies</span>
          </span>
          <img src={assets.logo} alt="Logo" className="me-3 navbar-logo-img" />
        </a>
        <a className="navbar-toggler" onClick={toggleNav}>
          <img src={assets.list} alt="Menu" className="navbar-toggler-icon" />
        </a>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="#" onClick={() => handleMenuClick("home", "/")} className={`nav-link ${menu === "home" ? "active" : ""}`}>Home</a>
            </li>
            <li className="nav-item">
              <a href='#explore-menu' onClick={() => handleMenuClick("menu")} className={`nav-link ${menu === "menu" ? "active" : ""}`}>Menu</a>
            </li>
            <li className="nav-item">
              <a href='#app-download' onClick={() => handleMenuClick("mobile-app")} className={`nav-link ${menu === "mobile-app" ? "active" : ""}`}>Mobile App</a>
            </li>
            <li className="nav-item">
              <a href='#footer' onClick={() => handleMenuClick("contact-us")} className={`nav-link ${menu === "contact-us" ? "active" : ""}`}>Contact Us</a>
            </li>
          </ul>
          <div className="navbar-right d-flex align-items-center">
            <img src={assets.search_icon} alt="Search Icon" className="navbar-icon" />
            <Link to='/cart' className="position-relative">
              <img className='basketlogo navbar-icon' src={assets.basket_icon} alt="Cart" />
              {getTotalCartAmount() !== 0 && <div className="dot"></div>}
            </Link>
            {!token ? (
              <button className='signbutton' onClick={() => setShowLogin(true)}>Sign in</button>
            ) : (
              <div className='navbar-profile'>
                <img src={assets.profile_icon} className='white-filter' alt="Profile" />
                <ul className="nav-profile-dropdown">
                  <li onClick={() => handleMenuClick('orders', '/myorders')}><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
