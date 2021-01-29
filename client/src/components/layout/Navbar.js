import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Hamburger from "./Hamburger";

import "./Navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const handleScroll = () => {
    const navbar = document.getElementById("navbar");
    if (document.documentElement.scrollTop > 1) {
      if (navbar) navbar.classList.add("scrolled");
    } else {
      if (navbar) navbar.classList.remove("scrolled");
    }
  };

  window.onscroll = function() {
    handleScroll();
  };

  const authLinks = (
    <ul className="right menu">
      <li className="item">
        <a href="/dashboard#" className="color-pri">
          Your Day Zeros
        </a>
      </li>
      <li className="item">
        <a href="/search" className="reg">
          Search
        </a>
      </li>
      <li className="item">
        <a href="/howitworks" className="reg">
          How It Works
        </a>
      </li>
      <li className="item">
        <Link onClick={logout} to="/#" className="color-sec">
          <i className="fas fa-sign-out-alt" /> Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="right menu">
      <li className="item">
        <a href="/#" className="reg">
          Home
        </a>
      </li>
      <li className="item">
        <a href="/#discover" className="reg">
          Discover
        </a>
      </li>
      <li className="item">
        <a href="/#possibilities" className="reg">
          Possibilities
        </a>
      </li>
      <li className="item">
        <a href="/#footer-desktop" className="color-sec">
          Register
        </a>
      </li>
      <li className="item">
        <Link to="/login" className="color-pri">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="ui secondary menu navbar" id="navbar">
      {!loading && <Hamburger authenticated={isAuthenticated} />}
      <a className="logo-box" href={isAuthenticated ? "/dashboard#" : "/#"}>
        <img
          src={require("../../img/logo.svg")}
          className="img-logo"
          alt="Day Zero"
        />
      </a>
      {!loading && (
        <div className="links">{isAuthenticated ? authLinks : guestLinks}</div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
