import React from "react";

const Section2 = () => {
  return (
    <div id="howitworks">
      <div className="faq">
        <p className="faq-title">
          <b>How automatic meal matches work</b>
        </p>
        <p className="faq-body">
          In addition to manually searching for users on the Day Zero network
          with our 'search' feature, we can also match you for a meal
          automatically with a someone who shares your passions.
          <br></br>
          <br></br>
          To get an automatic match, go to your Day Zero dashboard and fill out
          when you're free for lunch or dinner. Based on who you've liked (see
          below) and what categories you identified with, DZ will automatically
          find an optimal match. Once found, we will send you both an
          introductory email, and then you guys can figure out the specific
          meeting place and time.
        </p>
      </div>
      <div className="faq">
        <p className="faq-title">
          <b>What are likes?</b>
        </p>
        <p className="faq-body">
          If you go to someone's profile, you will see a red 'Like' button. Its
          purpose is for you to tell us what kind of person you enjoy meeting so
          we can recommend you people you'd vibe with but don't necessarily
          share a lot of commonalities with. For example, if you have a close
          friend that has different interests than you but you would still like
          to engage with people like them, you'd 'like' them and DZ will
          incorporate that in its recommendation engine.
        </p>
      </div>
      <div className="faq">
        <p className="faq-title">
          <b>How does search work?</b>
        </p>
        <p className="faq-body">
          Search's purpose is to help you efficiently find people that have any
          combination of characteristics. You can filter based on your heart's
          desire, and once you go to someone's profile, you can click 'Say Hi'
          to reach out to them.
        </p>
      </div>
    </div>
  );
};

export default Section2;
