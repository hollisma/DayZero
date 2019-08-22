import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGroup } from "../../actions/group";
import ReceiverFeedback from "./ReceiverFeedback";

import "./Feedback.css";

const Feedback = ({
  group: { members, loading },
  auth: { user },
  getCurrentGroup
}) => {
  const [r1, setR1] = useState({
    rating: null,
    binary: null
  });
  const [r2, setR2] = useState({
    rating: null,
    binary: null
  });
  const [r3, setR3] = useState({
    rating: null,
    binary: null
  });
  const setStates = [setR1, setR2, setR3];

  if (loading) {
    getCurrentGroup();
  }

  const onSubmit = () => {
    console.log("r1", r1);
    console.log("r2", r2);
    console.log("r3", r3);
  };

  const Receivers = members.map((m, i) =>
    m && i !== 0 ? (
      <ReceiverFeedback setStateCallback={setStates[i - 1]} key={m} />
    ) : null
  );

  return (
    <div className="feedback">
      {Receivers}
      <button onClick={() => onSubmit()} className="ui green basic button">
        Submit
      </button>
    </div>
  );
};

Feedback.propTypes = {
  getCurrentGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentGroup }
)(Feedback);
