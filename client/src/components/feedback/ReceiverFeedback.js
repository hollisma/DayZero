import React, { Fragment, useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import PropTypes from "prop-types";

const ReceiverFeedback = ({ name, receiver_id, setStateCallback }) => {
  const [rating, setRating] = useState(0);
  const [binary, setBinary] = useState(null);

  const updateParent = () => {
    setStateCallback({
      receiver_id: receiver_id,
      rating: rating,
      binary: binary
    });
  };

  return (
    <Fragment>
      <div>member person: {name}</div>
      <StarRatingComponent
        name={"rating" + receiver_id}
        starCount={10}
        value={rating}
        onStarClick={rating => setRating(rating)}
      />

      {/* TODO: replace button with actual rating/binary questions */}
      <button onClick={() => updateParent()}>click me</button>
    </Fragment>
  );
};

ReceiverFeedback.propTypes = {
  setStateCallback: PropTypes.func.isRequired
};

export default ReceiverFeedback;
