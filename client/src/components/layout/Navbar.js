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
        <Link onClick={logout} to="/#" className="text-secondary">
          <i className="fas fa-sign-out-alt" /> Logout
        </Link>
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
        <a
          href="https://medium.com/@kelvinotcelsius/a-letter-from-the-founders-introducing-day-zero-428b591fc778"
          // target="_blank"
        >
          Our Letter
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
      {!loading && <Hamburger authenticated={isAuthenticated} />}
      <h1 className="item">
        <a className="logo-box" href={isAuthenticated ? "/dashboard#" : "/#"}>
          <img
            src={require("../../img/logo.svg")}
            className="img-logo"
            alt="Day Zero"
          />
        </a>
      </h1>
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

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
