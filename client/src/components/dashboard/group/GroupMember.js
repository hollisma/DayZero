import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

const GroupMember = ({ member_id, name, avatar, major, bio }) => {
  let res = "";
  if (member_id !== "-1") {
    res = (
      <span className="group-member-info">
        <div className="group-member-info">
          <b>{name}</b> is studying <b>{major}</b>.
        </div>
        {bio ? <div>Here's a bit about them: {bio}</div> : null}
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
