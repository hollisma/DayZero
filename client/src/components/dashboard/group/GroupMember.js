import React from "react";
import PropTypes from "prop-types";

const GroupMember = ({ member_id, name, college, major }) => {
  console.log("member_id", member_id);
  let res = "";
  if (member_id !== "-1") {
    res = (
      <span>
        <b>{name}</b> is at <b>{college}</b> studying <b>{major}</b>
      </span>
    );
  }

  return <div>{res || "Searching..."}</div>;
};

GroupMember.propTypes = {
  member_id: PropTypes.string.isRequired
};

export default GroupMember;
