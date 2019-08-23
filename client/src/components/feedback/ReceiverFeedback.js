import React, { Fragment } from "react";
import StarRatingComponent from "react-star-rating-component";
import PropTypes from "prop-types";

const ReceiverFeedback = ({
  name,
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
    <Fragment>
      <div>member person: {name}</div>
      <StarRatingComponent
        name={"rating" + receiver_id}
        starCount={10}
        value={rating}
        onStarClick={rating => updateParent(rating)}
      />
      <button onClick={() => updateParent(null, true)}>Yes</button>
      <button onClick={() => updateParent(null, false)}>No</button>
    </Fragment>
  );
};

ReceiverFeedback.propTypes = {
  setStateCallback: PropTypes.func.isRequired
};

export default ReceiverFeedback;
