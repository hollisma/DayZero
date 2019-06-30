import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
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

  const authLinks = (
    <ul className="right menu">
      <li className="item">
        <a onClick={logout} href="#!" className="text-primary">
          <i className="fas fa-sign-out-alt" /> Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="right menu">
      <li className="item">
        <a href="#first" className="text-primary">
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
        <Link to="/Register" className="text-secondary">
          Sign In
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="ui secondary menu navbar" id="navbar">
      <h1 className="item">
        <Link to="/">Day Zero</Link>
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
