import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

const GroupMember = ({ member_id, name, email, major, bio }) => {
  let res = "";
  if (member_id !== "-1") {
    res = (
      <span className="group-member-info">
        <div className="group-member-info">
          <b>{name}</b> is studying <b>{major}</b>.
        </div>
        <div>Here's a bit about them: {bio}</div>
      </span>
    );
  }

  return (
    <div className="group-member">
      <Avatar
        email={email}
        name={name}
        size="100"
        round
        className="avatar"
        // color={
        //   "#" +
        //   (function co(lor) {
        //     return (lor += [
        //       0,
        //       1,
        //       2,
        //       3,
        //       4,
        //       5,
        //       6,
        //       7,
        //       8,
        //       9,
        //       "a",
        //       "b",
        //       "c",
        //       "d",
        //       "e",
        //       "f"
        //     ][Math.floor(Math.random() * 16)]) && lor.length === 6
        //       ? lor
        //       : co(lor);
        //   })("")
        // }
        color="#ffffff"
        src="https://i.stack.imgur.com/dr5qp.jpg"
      />
      {res || "Searching..."}
    </div>
  );
};

GroupMember.propTypes = {
  member_id: PropTypes.string.isRequired
};

export default GroupMember;
