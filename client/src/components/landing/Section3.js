import React from "react";

const Section3 = () => {
  return (
    <div id="faq" className="dark yellow chunk">
      <div className="ui two column stackable container center aligned grid">
        <h1 className="title">FAQ</h1>
        <div>
          <h2 className="question">Can we choose who we grab meals with?</h2>
          <p className="answer">
            We're working on an update that will let you search for anyone with
            interests XYZ and request meetings with them. Stay tuned!
          </p>
          <h2 className="question">
            What information will be displayed to other users?
          </h2>
          <p className="answer">
            Only your interests and bio are displayed to others for the purpose
            of helping your matches know more about you before the meeting. No
            private information will ever be displayed to others.
          </p>
          <h2 className="question">
            Can we sign up if we don't go to Stanford or Princeton?
          </h2>
          <p className="answer">
            If you would like Day Zero to launch at your university, shoot us an
            email <a href="mailto:founders.dayzero@gmail.com">here</a> and we
            will expand access as soon as possible.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section3;
