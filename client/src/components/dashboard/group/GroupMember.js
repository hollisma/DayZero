import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

const GroupMember = ({ member_id, name, email, college, major }) => {
  let res = "";
  if (member_id !== "-1") {
    res = (
      <span className="group-member-info">
        <b>{name}</b> is at <b>{college}</b> studying <b>{major}</b>
      </span>
    );
  }

  return (
    <div className="group-member">
      <Avatar email={email} name={name} size="100" round className="avatar" />
      {res || "Searching..."}
    </div>
  );
};

GroupMember.propTypes = {
  member_id: PropTypes.string.isRequired
};

export default GroupMember;
