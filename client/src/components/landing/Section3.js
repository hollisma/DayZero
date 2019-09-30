import React from "react";

const Section3 = () => {
  return (
    <div id="faq" className="dark yellow chunk">
      <div className="ui two column stackable container center aligned grid">
        <h1 className="title">FAQ</h1>
        <div>
          <h2 className="question">Can we choose who we grab meals with?</h2>
          <p className="answer">
            We're working on an update that will let you view people's profiles
            and request 1-on-1 meetings. Stay tuned!
          </p>
          <h2 className="question">
            Can we sign up if we don't go to Stanford or Princeton?
          </h2>
          <p className="answer">
            If you would like Day Zero to launch at your university, shoot me an
            email <a href="mailto:zkyu@princeton.edu">here</a> and we will
            expand access as soon as possible.{" "}
          </p>
          <h2 className="question">Why groups of four?</h2>
          <p className="answer">
            Did you know that in order to meet all of the undergrads at
            Princeton in one year, you would have to meet 25 people per day?
            There's too many of us! Our goal is to help you expand your social
            circle, so why start with 1-on-1s when there's so much untapped
            potential (although not to worry, that feature is coming soon)? We
            chose to go with groups of four because many studies show that four
            is the optimal number for a group conversation.
          </p>
          <h2 className="question">
            What information will be displayed to other users?
          </h2>
          <p className="answer">
            Only your interests and written responses to our sign-up questions
            are displayed to others for the purpose of helping your matches know
            more about you before the meeting. No private information will ever
            be displayed to others.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section3;
