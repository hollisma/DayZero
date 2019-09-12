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
            Since the groups are determined algorithmically, users meet in
            groups of four to ensure that no awkward pairings occur. If people
            met in groups of two, there's the chance that you won't vibe with
            the other person, whereas it's highly likely you will find someone
            you want to meet again in a group of four.
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
