import React from "react";

const Navbar = () => {
  return (
    <nav className="ui secondary menu navbar">
      <h1 className="item">
        <a href="index.html">Day Zero</a>
      </h1>
      <ul className="right menu">
        <li className="item">
          <a href="home.html" className="current">
            Home
          </a>
        </li>
        <li className="item">
          <a href="howitworks.html" className="reg">
            How It Works
          </a>
        </li>
        <li className="item">
          <a href="aboutus.html" className="reg">
            FAQ/About Us
          </a>
        </li>
        <li className="item">
          <a href="signin.html" className="signin">
            Sign In
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
