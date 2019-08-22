import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGroup } from "../../actions/group";

import "./Feedback.css";

const Feedback = ({
  group: { members, loading },
  auth: { user },
  getCurrentGroup
}) => {
  if (loading) {
    console.log("hi");
    getCurrentGroup();
  }

  const onSubmit = () => {
    console.log(members);
    console.log(user);
  };

  return (
    <div className="feedback">
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
