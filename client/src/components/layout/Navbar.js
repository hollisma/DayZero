import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

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
        <a href="/dashboard#" className="text-primary">
          Your Day Zeros
        </a>
      </li>
      <li className="item">
        <a href="/dashboard#settings" className="reg">
          Settings
        </a>
      </li>
      <li className="item">
        <a href="/#howitworks" className="reg">
          How It Works
        </a>
      </li>
      <li className="item">
        <a onClick={logout} href="/#" className="text-secondary">
          <i className="fas fa-sign-out-alt" /> Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="right menu">
      <li className="item">
        <a href="/#" className="text-primary">
          Home
        </a>
      </li>
      <li className="item">
        <a href="/#howitworks" className="reg">
          How It Works
        </a>
      </li>
      <li className="item">
        <a href="/#faq" className="reg">
          FAQ/About Us
        </a>
      </li>
      <li className="item">
        <Link to="/Register" className="text-secondary">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="ui secondary menu navbar" id="navbar">
      <h1 className="item">
        <a href={isAuthenticated ? "/dashboard#" : "/#"}>
          <img
            src={require("../../img/logo.svg")}
            className="img-logo"
            alt="Day Zero"
          />
        </a>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
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

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
