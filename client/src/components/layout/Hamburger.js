import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

import "./Hamburger.css";

const Hamburger = ({ authenticated }) => {
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
                <a href="/dashboard#settings" onClick={() => setToggled(false)}>
                  Settings
                </a>
              </li>
              <li>
                <a href="/#howitworks" onClick={() => setToggled(false)}>
                  How It Works
                </a>
              </li>
              <li>
                <Link
                  to="/#"
                  onClick={() => {
                    setToggled(false);
                    logout();
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
                <a href="/#howitworks" onClick={() => setToggled(false)}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#faq" onClick={() => setToggled(false)}>
                  FAQ/About Us
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@kelvinotcelsius/a-letter-from-the-founders-introducing-day-zero-428b591fc778"
                  // target="_blank"
                  onClick={() => setToggled(false)}
                >
                  Our Letter
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default Hamburger;
