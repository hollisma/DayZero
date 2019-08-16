import React from "react";
import PropTypes from "prop-types";

const GroupMember = ({ member_id, name, avatar, college, major }) => {
  let pic = (
    <img
      className="avatar"
      src={
        avatar ||
        "//www.gravatar.com/avatar/73745bceffd75a7e5a1203d9f0e9fe44?s=200&r=pg&d=mm"
      }
      alt=""
    />
  );

  let res = "";
  if (member_id !== "-1") {
    res = (
      <span className="gruop-member-info">
        <b>{name}</b> is at <b>{college}</b> studying <b>{major}</b>
      </span>
    );
  }

  return (
    <div className="group-member">
      {pic}
      {res || "Searching..."}
    </div>
  );
};

GroupMember.propTypes = {
  member_id: PropTypes.string.isRequired
};

export default GroupMember;
