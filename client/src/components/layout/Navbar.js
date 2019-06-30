import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleScroll = () => {
    const navbar = document.getElementById("navbar");
    if (document.documentElement.scrollTop > 1) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.onscroll = function() {
    handleScroll();
  };

  return (
    <nav className="ui secondary menu navbar" id="navbar">
      <h1 className="item">
        <Link to="/">Day Zero</Link>
      </h1>
      <ul className="right menu">
        <li className="item">
          <a href="#first" className="current">
            Home
          </a>
        </li>
        <li className="item">
          <a href="#second" className="reg">
            How It Works
          </a>
        </li>
        <li className="item">
          <a href="#third" className="reg">
            FAQ/About Us
          </a>
        </li>
        <li className="item">
          <Link to="/Register" className="register">
            Sign In
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
