import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

import "./Hamburger.css";

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
                <a href="/dashboard#" onClick={() => setToggled(false)}>
                  Your Day Zeros
                </a>
              </li>
              <li>
                <a href="/search" onClick={() => setToggled(false)}>
                  Search
                </a>
              </li>
              <li>
                <a href="/howitworks" onClick={() => setToggled(false)}>
                  How It Works
                </a>
              </li>
              <li>
                <Link
                  to="/#"
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
                <a href="/#" onClick={() => setToggled(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="/#discover" onClick={() => setToggled(false)}>
                  Discover
                </a>
              </li>
              <li>
                <a href="/#possibilities" onClick={() => setToggled(false)}>
                  Possibilities
                </a>
              </li>
              <li>
                <Link to="/Register" onClick={() => setToggled(false)}>
                  Register
                </Link>
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
