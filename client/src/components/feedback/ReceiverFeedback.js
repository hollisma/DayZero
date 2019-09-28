import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

import "./Feedback.css";

const ReceiverFeedback = ({
  name,
  avatar,
  receiver_id,
  binary,
  setStateCallback
}) => {
  const updateParent = (r, b) => {
    setStateCallback({
      receiver_id: receiver_id,
      binary: b != null ? b : binary
    });
  };

  return (
    <div className="receiver-feedback">
      <div className="info">
        <Avatar className="avatar" size="45%" round src={avatar} />
        <div className="member">{name}</div>
      </div>
      <div className="binary">
        <p id="question-one">Would you want to meet {name} again?</p>
        <button
          className={
            "ui green button " + ((binary == null || !binary) && "basic")
          }
          onClick={() => updateParent(null, true)}
        >
          Yes
        </button>
        <button
          className={"ui red button " + ((binary == null || binary) && "basic")}
          onClick={() => updateParent(null, false)}
        >
          No
        </button>
      </div>
      <div className="superlike">
        <p>I absolutely LOVED meeting this person!</p>
        <div class="ui labeled button" tabindex="0">
          <div class="ui red button">
            <i class="heart icon"></i> Like
          </div>
          <a class="ui basic red left pointing label">1,048</a>
        </div>
      </div>
    </div>
  );
};

ReceiverFeedback.propTypes = {
  setStateCallback: PropTypes.func.isRequired
};

export default ReceiverFeedback;
