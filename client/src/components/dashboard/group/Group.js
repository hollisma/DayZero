import React from "react";
import GroupMember from "./GroupMember";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGroup, getMembersProfiles } from "../../../actions/group";

const Group = ({
  group: { members, membersData, loading, membersLoading },
  getCurrentGroup,
  getMembersProfiles
}) => {
  if (loading) {
    getCurrentGroup();
  }

  if (!loading && membersLoading) {
    getMembersProfiles(members);
  }

  let memberComponents = membersData.map((m, i) => (
    <GroupMember
      member_id={m.user ? m.user._id : "-1"}
      college={m.college}
      major={m.major}
      key={i}
    />
  ));

  return (
    <div id="group" className="group">
      <h1 className="larger text-primary">Group</h1>
      <p>Here's your group: </p>
      <div className="group-icons">{memberComponents}</div>
    </div>
  );
};

Group.propTypes = {
  getCurrentGroup: PropTypes.func.isRequired,
  getMembersProfiles: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(
  mapStateToProps,
  { getCurrentGroup, getMembersProfiles }
)(Group);
