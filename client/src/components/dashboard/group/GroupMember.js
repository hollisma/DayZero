import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "react-avatar";

import "./GroupMember.css";

const GroupMember = ({
  member_id,
  name,
  avatar,
  major,
  minor,
  bio
  // want_to_meet
}) => {
  let res = "";
  if (member_id !== "-1") {
    res = (
      <a className="group-member-info" href={"../profile/" + member_id}>
        <div className="name-pic">
          <Avatar className="avatar" size="100" round src={avatar} />
          <p id="name">{name}</p>
        </div>
        <div className="information">
          <p id="academics">
            <b>Major:</b> {major}
          </p>
          {minor.length > 0 ? (
            <p>
              <b>Minor: </b>
              {minor}
            </p>
          ) : null}
          {bio ? (
            <p>
              <b>About: </b>
              {bio}
            </p>
          ) : null}
        </div>
      </a>
    );
  }

  return (
    <div className="group-member">
      {res ||
        (false &&
          "We're finding you a match! Go do your homework, we'll send an email when we've found a match :)")}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

GroupMember.propTypes = {
  member_id: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(GroupMember);
