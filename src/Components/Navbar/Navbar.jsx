import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from '../Assets/logo1.png';
import search_icon from '../Assets/search_icon.png';
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  const handleSearch = () => {
    // Add your search logic here
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="nav-logo" />
        <p>Basket</p>
      </div>
      <div className='nav-search'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <img src={search_icon} alt='Search' />
        </button>
      </div>
      <ul className="nav-menu">
        <li
          onMouseEnter={() => setMenu("shop")}
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li 
        onClick={() => {
          setMenu("mens");
        }}
        className="dropdown">
          <span>
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link> <FontAwesomeIcon icon={faAngleDown} />
          </span>
          <div className="dropdown-content">
            <Link to="/mens/jacket">Jacket</Link><br />
            <Link to="/mens/hoodie">Hoodie</Link><br />
            <Link to="/mens/shirt">Shirt</Link><br />
            <Link to="/mens/t-shirt">T-Shirt</Link><br />
            <Link to="/mens/shoes">Shoes</Link><br />
          </div>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li 
        onClick={() => {
          setMenu("womens");
        }}
        className="dropdown">
          <span>
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link> <FontAwesomeIcon icon={faAngleDown} />
          </span>
          <div className="dropdown-content">
            <Link to="/womens/jacket">Jacket</Link><br />
            <Link to="/womens/hoodie">Hoodie</Link><br />
            <Link to="/womens/shirt">Shirt</Link><br />
            <Link to="/womens/t-shirt">T-Shirt</Link><br />
            <Link to="/womens/shoes">Shoes</Link><br />
          </div>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li 
        onClick={() => {
          setMenu("kids");
        }}
        className="dropdown">
          <span>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kid
          </Link> <FontAwesomeIcon icon={faAngleDown} />
          </span>
          <div className="dropdown-content">
            <Link to="/kids/jacket">Jacket</Link><br />
            <Link to="/kids/hoodie">Hoodie</Link><br />
            <Link to="/kids/shirt">Shirt</Link><br />
            <Link to="/kids/t-shirt">T-Shirt</Link><br />
            <Link to="/kids/shoes">Shoes</Link><br />
          </div>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="cart-icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
