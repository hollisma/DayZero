import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ReceiverFeedback = ({ setStateCallback }) => {
  return (
    <Fragment>
      <div>member person</div>
      <button onClick={() => setStateCallback({ rating: 5, binary: true })}>
        click me
      </button>
    </Fragment>
  );
};

ReceiverFeedback.propTypes = {};

export default ReceiverFeedback;
