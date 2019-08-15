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

  return (
    <div id="group" className="group">
      <h1 className="larger text-primary">Group</h1>
      <p>Here's your group: </p>
      <div className="group-icons">
        <GroupMember member_id={members[0]} />
        <GroupMember member_id={members[1]} />
        <GroupMember member_id={members[2]} />
        <GroupMember member_id={members[3]} />
      </div>
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
