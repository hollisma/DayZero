import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ReceiverFeedback = ({ name, setStateCallback }) => {
  return (
    <Fragment>
      <div>member person: {name}</div>

      {/* TODO: replace button with actual rating/binary questions */}
      <button onClick={() => setStateCallback({ rating: 5, binary: true })}>
        click me
      </button>
    </Fragment>
  );
};

ReceiverFeedback.propTypes = {
  setStateCallback: PropTypes.func.isRequired
};

export default ReceiverFeedback;
