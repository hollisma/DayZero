import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

import "./Hamburger.css";
import "./Navbar.css";

const Hamburger = ({ authenticated, logout }) => {
  const [toggled, setToggled] = useState(false);

  if (authenticated) {
    return (
      <div className="hamburger">
        <nav role="navigation">
          <div id="menuToggle" className={toggled ? "toggled" : ""}>
            <input type="checkbox" onClick={() => setToggled(!toggled)} />

            {/* Some spans to act as a hamburger.*/}
            <span></span>
            <span></span>
            <span></span>

            <ul id="menu">
              <li>
                <a href="/dashboard#" className='color-pri' onClick={() => setToggled(false)}>
                  Your Day Zeros
                </a>
              </li>
              <li>
                <a href="/search" className='reg' onClick={() => setToggled(false)}>
                  Search
                </a>
              </li>
              <li>
                <a href="/FAQ" className='reg' onClick={() => setToggled(false)}>
                  FAQ
                </a>
              </li>
              <li>
                <Link
                  to="/#"
                  className='color-sec' 
                  onClick={() => {
                    logout();
                    setToggled(false);
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="hamburger">
        <nav role="navigation">
          <div id="menuToggle" className={toggled ? "toggled" : ""}>
            <input type="checkbox" onClick={() => setToggled(!toggled)} />

            {/* Some spans to act as a hamburger.*/}
            <span></span>
            <span></span>
            <span></span>

            <ul id="menu">
              <li>
                <a href="/#" className='reg' onClick={() => setToggled(false)}>
                  Home
                </a>
              </li>
              {/* <li>
                <a href="/#discover" onClick={() => setToggled(false)}>
                  Discover
                </a>
              </li>
              <li>
                <a href="/#possibilities" onClick={() => setToggled(false)}>
                  Possibilities
                </a>
              </li> */}
              <li>
                <Link to="/FAQ" className='reg' onClick={() => setToggled(false)}>
                  FAQ
                </Link>
              </li>
              <li>
                <a href="/#footer-mobile" className='color-sec' onClick={() => setToggled(false)}>
                  Register
                </a>
              </li>
              <li>
                <a href="/login" className='color-pri' onClick={() => setToggled(false)}>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

Hamburger.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Hamburger);
