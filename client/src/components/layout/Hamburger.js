import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

import "./Hamburger.css";

const Hamburger = authenticated => {
  if (authenticated) {
    return (
      <div className="hamburger">
        <nav role="navigation">
          <div id="menuToggle">
            {/* A fake / hidden checkbox is used as click reciever,
            so you can use the :checked selector on it. */}
            <input type="checkbox" />

            {/* Some spans to act as a hamburger.
            
            They are acting like a real hamburger,
            not that McDonalds stuff. */}
            <span></span>
            <span></span>
            <span></span>

            {/* Too bad the menu has to be inside of the button
            but hey, it's pure CSS magic. */}
            <ul id="menu">
              <a href="/dashboard#">
                <li>Your Day Zeros</li>
              </a>
              <a href="/dashboard#settings">
                <li>Settings</li>
              </a>
              <a href="/#howitworks">
                <li>How It Works</li>
              </a>
              <Link onClick={logout} to="/#">
                <i className="fas fa-sign-out-alt" /> <li>Logout</li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="hamburger">
        <nav role="navigation">
          <div id="menuToggle">
            {/* A fake / hidden checkbox is used as click reciever,
            so you can use the :checked selector on it. */}
            <input type="checkbox" />

            {/* Some spans to act as a hamburger.
            
            They are acting like a real hamburger,
            not that McDonalds stuff. */}
            <span></span>
            <span></span>
            <span></span>

            {/* Too bad the menu has to be inside of the button
            but hey, it's pure CSS magic. */}
            <ul id="menu">
              <a href="/#">
                <li>Home</li>
              </a>
              <a href="/#howitworks">
                <li>How It Works</li>
              </a>
              <a href="/#faq">
                <li>FAQ/About Us</li>
              </a>
              <a
                href="https://medium.com/@kelvinotcelsius/a-letter-from-the-founders-introducing-day-zero-428b591fc778"
                // target="_blank"
              >
                <li>Our Letter</li>
              </a>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default Hamburger;
