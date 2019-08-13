import React from "react";
import GroupMember from "./GroupMember";
import PropTypes from "prop-types";

const Group = props => {
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

Group.propTypes = {};

export default Group;
