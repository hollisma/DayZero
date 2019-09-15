import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

import "./GroupMember.css";

const GroupMember = ({ member_id, name, avatar, major, bio, want_to_meet }) => {
  let res = "";
  if (member_id !== "-1") {
    res = (
      <span className="group-member-info">
        <div className="group-member-info">
          <p>{name}</p>
          <p>
            <b>Wants to meet:</b> {want_to_meet}
          </p>
        </div>
        {bio ? (
          <div>
            <b>About: </b>
            {bio}
          </div>
        ) : null}
      </span>
    );
  }

  return (
    <div className="group-member">
      <Avatar className="avatar" size="100" round src={avatar} />
      {res || "Searching..."}
    </div>
  );
};

GroupMember.propTypes = {
  member_id: PropTypes.string.isRequired
};

export default GroupMember;
