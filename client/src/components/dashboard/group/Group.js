import React, { Fragment } from "react";
import { Link } from "react-router-dom";
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
} from "../../../utils/consts";

import "./Group.css";

const Group = ({
  group: { members, membersData, loading, membersLoading },
  auth: { user, isAuthenticated },
  getCurrentGroup,
  getMembersProfiles
}) => {
  if (loading) {
    getCurrentGroup();
  }

  if (!loading && membersLoading) {
    getMembersProfiles(members);
  }

  // let memberComponents =
  //   !loading && !membersLoading ? (
  //     membersData.map((m, i) => (
  //       <GroupMember
  //         member_id={m.user ? m.user._id : "-1"}
  //         name={m.user ? m.user.name : ""}
  //         avatar={
  //           m.user ? m.user.avatar : "https://i.stack.imgur.com/dr5qp.jpg"
  //         }
  //         major={m.major}
  //         bio={m.bio}
  //         key={i}
  //       />
  //     ))
  //   ) : (
  //     <Spinner />
  //   );

  const userType = user ? user.user_type : GUEST;

  return (
    <div className="ui container">
      <h1 className="group-header">Your Group</h1>
      <p>
        Below are all your matches! Once the group of four is complete, we will
        put everyone in a group chat so you guys can decide the specific time
        and place to meet.
      </p>
      <div id="group" className="group">
        {userType === PROFILED ? (
          <Fragment>
            <p>
              Put in some times so that other people know when they can meet
              you. You will NOT be matched unless you fill this in.
            </p>
            <button className="ui button basic blue big">
              <a href="/dashboard#calendar" className="reg">
                Calendar
              </a>
            </button>
          </Fragment>
        ) : userType === SCHEDULED ? (
          <Fragment>
            <p>
              One sec...we're trying to find people that you'll love talking to.
              Once the group of four is complete, we will put everyone in a
              group chat so you guys can decide the specific time and place to
              meet.
            </p>
            <button className="ui button basic blue big">
              <a href="/dashboard#calendar" className="reg">
                Calendar
              </a>
            </button>
          </Fragment>
        ) : userType === SCHEDULED ? (
          <p>Finding other people that you'll love talking to...</p>
        ) : userType === GROUPED ? (
          <p>Here's your group: </p>
        ) : userType === MET ? (
          <Fragment>
            <p>Fill out the feedback form here!</p>
            <button className="ui button basic blue big">
              <Link to="/feedback" className="reg">
                Feedback
              </Link>
            </button>
          </Fragment>
        ) : (
          <p>Have a question? Contant us at dayzero@gmail.com</p>
        )}
        {!loading && !membersLoading && isAuthenticated ? (
          <div className="group-container ui equal width grid">
            <GroupMember
              member_id={membersData[3].user ? membersData[3].user._id : "-1"}
              name={membersData[3].user ? membersData[3].user.name : ""}
              avatar={
                membersData[3].user
                  ? membersData[3].user.avatar
                  : "https://i.stack.imgur.com/dr5qp.jpg"
              }
              major={membersData[3].major}
              minor={membersData[3].minor}
              bio={membersData[3].bio}
              want_to_meet={membersData[3].want_to_meet}
            />
            <GroupMember
              member_id={membersData[0].user ? membersData[0].user._id : "-1"}
              name={membersData[0].user ? membersData[0].user.name : ""}
              avatar={
                membersData[0].user
                  ? membersData[0].user.avatar
                  : "https://i.stack.imgur.com/dr5qp.jpg"
              }
              major={membersData[0].major}
              minor={membersData[0].minor}
              bio={membersData[0].bio}
              want_to_meet={membersData[0].want_to_meet}
            />
            <GroupMember
              member_id={membersData[1].user ? membersData[1].user._id : "-1"}
              name={membersData[1].user ? membersData[1].user.name : ""}
              avatar={
                membersData[1].user
                  ? membersData[1].user.avatar
                  : "https://i.stack.imgur.com/dr5qp.jpg"
              }
              major={membersData[1].major}
              minor={membersData[1].minor}
              bio={membersData[1].bio}
              want_to_meet={membersData[1].want_to_meet}
            />
            <GroupMember
              member_id={membersData[2].user ? membersData[2].user._id : "-1"}
              name={membersData[2].user ? membersData[2].user.name : ""}
              avatar={
                membersData[2].user
                  ? membersData[2].user.avatar
                  : "https://i.stack.imgur.com/dr5qp.jpg"
              }
              major={membersData[2].major}
              minor={membersData[2].minor}
              bio={membersData[2].bio}
              want_to_meet={membersData[2].want_to_meet}
            />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

Group.propTypes = {
  getCurrentGroup: PropTypes.func.isRequired,
  getMembersProfiles: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentGroup, getMembersProfiles }
)(Group);
