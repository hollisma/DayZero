import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

import "./GroupMember.css";

const GroupMember = ({
  member_id,
  name,
  avatar,
  major,
  minor,
  bio,
  want_to_meet
}) => {
  let res = "";
  if (member_id !== "-1") {
    res = (
      <div className="group-member-info">
        <div className="name-pic">
          <Avatar className="avatar" size="100" round src={avatar} />
          <p id="name">{name}</p>
        </div>
        <div className="information">
          <p id="academics">
            <b>Major:</b> {major + "\xa0" + "\xa0"}
            <b>Minor:</b> {minor}
          </p>
          <p>
            <b>Wants to meet:</b> {want_to_meet}
          </p>
          {bio ? (
            <div>
              <b>About: </b>
              {bio}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="group-member">
      {res ||
        "We're trying to find you a match! Go do your homework, we'll send you a text when your group has been finalized :)"}
    </div>
  );
};

GroupMember.propTypes = {
  member_id: PropTypes.string.isRequired
};

export default GroupMember;
