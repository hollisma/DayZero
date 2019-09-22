import React from "react";
import StarRatingComponent from "react-star-rating-component";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

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
        <Avatar className="avatar" size="100" round src={avatar} />
        <div className="member">{name}</div>
      </div>
      <div className="binary">
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
    </div>
  );
};

ReceiverFeedback.propTypes = {
  setStateCallback: PropTypes.func.isRequired
};

export default ReceiverFeedback;
