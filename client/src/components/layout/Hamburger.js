import React from "react";

import "./Hamburger.css";

const Hamburger = () => {
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
            <a href="#">
              <li>FirstLink</li>
            </a>
            <a href="#">
              <li>ToonLink</li>
            </a>
            <a href="#">
              <li>BotWLink</li>
            </a>
            <a href="#">
              <li>Ganon >:)</li>
            </a>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Hamburger;
