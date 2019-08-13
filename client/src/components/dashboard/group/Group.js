import React from "react";
import GroupMember from "./GroupMember";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGroup } from "../../../actions/group";

const Group = ({ group: { group, loading }, getCurrentGroup }) => {
  if (loading) getCurrentGroup();

  return (
    <div id="group" className="group">
      <h1 className="larger text-primary">Group</h1>
      <p>Here's your group: </p>
      <div className="group-icons">
        <GroupMember />
        <GroupMember />
        <GroupMember />
        <GroupMember />
      </div>
    </div>
  );
};

Group.propTypes = {
  getCurrentGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(
  mapStateToProps,
  { getCurrentGroup }
)(Group);
