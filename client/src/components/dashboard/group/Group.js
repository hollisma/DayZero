import React from "react";
import GroupMember from "./GroupMember";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGroup, getMembersProfiles } from "../../../actions/group";
import Spinner from "../../layout/Spinner";
import {
  GUEST,
  PROFILED,
  SCHEDULED,
  GROUPED,
  MET
} from "../../../actions/types";

import "./Group.css";

const Group = ({
  group: { members, membersData, loading, membersLoading },
  auth: { user },
  getCurrentGroup,
  getMembersProfiles
}) => {
  if (loading) {
    getCurrentGroup();
  }

  if (!loading && membersLoading) {
    getMembersProfiles(members);
  }

  let memberComponents =
    !loading && !membersLoading ? (
      membersData.map((m, i) => (
        <GroupMember
          member_id={m.user ? m.user._id : "-1"}
          name={m.user ? m.user.name : ""}
          avatar={m.user ? m.user.avatar : ""}
          college={m.college}
          major={m.major}
          key={i}
        />
      ))
    ) : (
      <Spinner />
    );

  const userType = user ? user.user_type : GUEST;

  return (
    <div id="group" className="group">
      <h1 className="larger text-primary">Group</h1>
      {userType === PROFILED ? (
        <p>
          Put in some times so that other people know when they can meet you
        </p>
      ) : userType === SCHEDULED ? (
        <p>Finding other people that you'll love talking to...</p>
      ) : userType === GROUPED ? (
        <p>Here's your group: </p>
      ) : userType === MET ? (
        <p>Fill out the feedback form here!</p>
      ) : (
        <p>Have a question? Contant us at dayzero@gmail.com</p>
      )}
      <div className="group-container">{memberComponents}</div>
    </div>
  );
};

Group.propTypes = {
  getCurrentGroup: PropTypes.func.isRequired,
  getMembersProfiles: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentGroup, getMembersProfiles }
)(Group);
