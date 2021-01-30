import React from "react";

import "./Landing.css";

const Section2 = () => {
  return (
    <div id="faq">
      <div className="faq">
        <p className="faq-title">What's the matching process like?</p>
        <p className="faq-body">
          Once you fill out the Activities and Calendar, we'll find someone 
          who's put down at least one same activity and time and who also shares
          at least 2 interests as you. After we've found someone that fits the 
          criteria, we'll send an email to y'all and let you connect. 
        </p>
      </div>
      <div className="faq">
        <p className="faq-title">If I'm not on campus, can I still use this?</p>
        <p className="faq-body">
          Definitely! The three activities right now are walking, having a meal, and 
          calling, and each of these can be done remotely. For example, you 
          and your match can go on a walk while voice calling each other, or
          share a virtual meal. If you have any ideas for more activities, 
          please email us at founders.dayzero@gmail.com
        </p>
      </div>
      <div className="faq">
        <p className="faq-title">Is this a dating app?</p>
        <p className="faq-body">
          Short answer: no, it's to meet people you otherwise wouldn't meet. 
          Long answer: trying to build a genuine friendship / relationship with 
          someone takes time, and we hope that Day Zero can be the zeroth step
          in that process :)
        </p>
      </div>
      <div className="faq">
        <p className="faq-title">What are you doing with my data?</p>
        <p className="faq-body">
          The only data of yours that we share is with the other 
          Princeton-email-verified people on the platform. Your data will never 
          be sold or given to anyone else without your consent. Also, your 
          password is encrypted. 
        </p>
      </div>
    </div>
  );
};

export default Section2;
