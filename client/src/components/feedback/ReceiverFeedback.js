import React, { Fragment, useState } from "react";
import SimpleStarRating from "./SimpleStarRating/SimpleStarRating";
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

  let r = new SimpleStarRating(document.getElementById("rating" + receiver_id));

  return (
    <Fragment>
      <div>member person: {name}</div>
      <span
        id={"rating" + receiver_id}
        class="rating"
        data-stars="15"
        data-default-rating="10.5"
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
