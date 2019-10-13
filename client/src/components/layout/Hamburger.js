import React, { useState } from "react";
import { logout } from "../../actions/auth";

import "./Hamburger.css";

const Hamburger = ({ authenticated }) => {
  const [toggled, setToggled] = useState(false);

  if (authenticated) {
    return (
      <div className="hamburger">
        <nav role="navigation">
          <div id="menuToggle" className={toggled ? "toggled" : ""}>
            {/* A fake / hidden checkbox is used as click reciever,
            so you can use the :checked selector on it. */}
            <input type="checkbox" onClick={() => setToggled(!toggled)} />

            {/* Some spans to act as a hamburger.
            
            They are acting like a real hamburger,
            not that McDonalds stuff. */}
            <span></span>
            <span></span>
            <span></span>

            {/* Too bad the menu has to be inside of the button
            but hey, it's pure CSS magic. */}
            <ul id="menu">
              <a href="/dashboard#" onClick={() => setToggled(false)}>
                <li>Your Day Zeros</li>
              </a>
              <a href="/dashboard#settings" onClick={() => setToggled(false)}>
                <li>Settings</li>
              </a>
              <a href="/#howitworks" onClick={() => setToggled(false)}>
                <li>How It Works</li>
              </a>
              <a href="/#" onClick={logout}>
                <li>Logout</li>
              </a>
              {/* <Link onClick={logout} to="/#">
                <i className="fas fa-sign-out-alt" /> <li>Logout</li>
              </Link> */}
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
            {/* A fake / hidden checkbox is used as click reciever,
            so you can use the :checked selector on it. */}
            <input type="checkbox" onClick={() => setToggled(!toggled)} />

            {/* Some spans to act as a hamburger.
            
            They are acting like a real hamburger,
            not that McDonalds stuff. */}
            <span></span>
            <span></span>
            <span></span>

            {/* Too bad the menu has to be inside of the button
            but hey, it's pure CSS magic. */}
            <ul id="menu">
              <a href="/#" onClick={() => setToggled(false)}>
                <li>Home</li>
              </a>
              <a href="/#howitworks" onClick={() => setToggled(false)}>
                <li>How It Works</li>
              </a>
              <a href="/#faq" onClick={() => setToggled(false)}>
                <li>FAQ/About Us</li>
              </a>
              <a
                href="https://medium.com/@kelvinotcelsius/a-letter-from-the-founders-introducing-day-zero-428b591fc778"
                // target="_blank"
                onClick={() => setToggled(false)}
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
