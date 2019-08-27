import React from "react";
import StarRatingComponent from "react-star-rating-component";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

const ReceiverFeedback = ({
  name,
  email,
  receiver_id,
  rating,
  binary,
  setStateCallback
}) => {
  const updateParent = (r, b) => {
    setStateCallback({
      receiver_id: receiver_id,
      rating: r || rating,
      binary: b != null ? b : binary
    });
  };

  return (
    <div className="receiver-feedback">
      <div className="info">
        <Avatar
          email={email}
          name={name}
          size="100"
          round
          // color={
          //   "#" +
          //   (function co(lor) {
          //     return (lor += [
          //       0,
          //       1,
          //       2,
          //       3,
          //       4,
          //       5,
          //       6,
          //       7,
          //       8,
          //       9,
          //       "a",
          //       "b",
          //       "c",
          //       "d",
          //       "e",
          //       "f"
          //     ][Math.floor(Math.random() * 16)]) && lor.length === 6
          //       ? lor
          //       : co(lor);
          //   })("")
          // }
          color="#ffffff"
          src="https://i.stack.imgur.com/dr5qp.jpg"
        />
        <div className="member">{name}</div>
      </div>
      <div className="rating">
        <StarRatingComponent
          name={"rating" + receiver_id}
          starCount={5}
          value={rating}
          onStarClick={rating => updateParent(rating)}
        />
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
