import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

import "./Feedback.css";

const ReceiverFeedback = ({
  name,
  avatar,
  receiver_id,
  emoji,
  setStateCallback
}) => {
  const updateParent = (r, b) => {
    setStateCallback({
      receiver_id: receiver_id,
      emoji: b !== -1 ? b : emoji
    });
  };

  return (
    <div className="receiver-feedback">
      <div className="info">
        <Avatar className="avatar" size="45%" round src={avatar} />
        <div className="member">{name}</div>
      </div>
      <div className="binary">
        <p id="question-one">How did your meeting with {name} go?</p>
        <span
          className={
            "ui button " + (emoji !== 1 && "basic")
          }
          role='img'
          aria-label='thumbs down'
          onClick={() => updateParent(null, 1)}
        >
          👎
        </span>
        <span
          className={"ui button " + (emoji !== 2 && "basic")}
          role='img'
          aria-label='thumbs up'
          onClick={() => updateParent(null, 2)}
        >
          👍
        </span>
        <span
          className={"ui button " + (emoji !== 3 && "basic")}
          role='img'
          aria-label='heart'
          onClick={() => updateParent(null, 3)}
        >
          ♥
        </span>
      </div>
      {/* <div className="superlike">
        <p>I absolutely LOVED meeting this person!</p>
        <div class="ui labeled button" tabindex="0">
          <div class="ui red button">
            <i class="heart icon"></i> Like
          </div>
          <p class="ui basic red left pointing label">1,048</p>
        </div>
      </div> */}
    </div>
  );
};

ReceiverFeedback.propTypes = {
  setStateCallback: PropTypes.func.isRequired
};

export default ReceiverFeedback;
