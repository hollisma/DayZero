import React from "react";
import PropTypes from "prop-types";

const GroupMember = ({ member_id }) => {
  return <div>{member_id || "Searching..."}</div>;
};

GroupMember.propTypes = {
  // member_id: PropTypes.string.isRequired
};

export default GroupMember;
