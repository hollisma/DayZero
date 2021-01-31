import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import GroupMember from "./GroupMember";
import Matching from "..//Matching";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGroup, getMembersProfiles, archiveGroup } from "../../../actions/group";
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
  group: { members, membersData, categories, activities, times, loading, membersLoading },
  auth: { user, isAuthenticated },
  getCurrentGroup,
  getMembersProfiles,
  archiveGroup
}) => {
  if (loading) {
    getCurrentGroup();
  }

  if (!loading && membersLoading) {
    getMembersProfiles(members);
  }

  let memberComponents =
    !loading && !membersLoading && isAuthenticated ? (
      membersData.map((m, i) => (
        <GroupMember
          member_id={m.user ? m.user._id : "-1"}
          name={m.user ? m.user.name : ""}
          avatar={
            m.user ? m.user.avatar : "https://i.stack.imgur.com/dr5qp.jpg"
          }
          year={m.year}
          major={m.major}
          minor={m.minor}
          bio={m.bio}
          key={i}
        />
      ))
    ) : (
      <Spinner />
    );

  const userType = user ? user.user_type : GUEST;

  const metOnClick = () => {
    archiveGroup()
  }

  const formatTime = s => {
    let arr = s.split(',')
    let meal = arr[1]
    let timesArr = arr[0].split('-')
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let month = months[parseInt(timesArr[0])-1]
    let day = timesArr[1]
    let result = meal + ' on ' + month + ' ' + day
    return result
  }

  let strListFormat = list => { 
    if (list.length > 2)
        return `${list.slice(0, list.length-1).join(', ')}, and ${list[list.length-1]}`
    else if (list.length === 2)
        return `${list[0]} and ${list[1]}`
    else return `${list[0]}`
  }

  const otherName = userType === MET && membersData[0] && membersData[0].user && 
    membersData[0].user.name !== user.name ? membersData[0].user.name.split(' ')[0] : 
    membersData[1] && membersData[1].user && membersData[1].user.name.split(' ')[0]

  return (
    <div className="ui container">
      <h1 className="group-header">Your Group</h1>
      <div id="group" className="group">
        {userType === PROFILED ? (
          <Fragment>
            <h3>
              If you'd like to meet someone, click here and fill out the
              activities and times you can do for your next meeting, then we'll 
              email you when we've found someone!
            </h3>
            <Matching />
          </Fragment>
        ) : userType === SCHEDULED ? (
          <Fragment>
            <h1 className='good-to-go'>You're good to go!</h1>
            <h3>
              We're currently searching for someone that shares your interests! 
              Once we find a match, we'll email you :) 
            </h3>
            <h3 style={{ marginTop: '0', marginBottom: '0' }}>
              In the meantime, feel free to change your preferences here: 
            </h3>
            <Matching />
          </Fragment>
        ) : userType === GROUPED ? (
          <Fragment>
            <h3>
              Here's your group! You should have received an email that you can 
              communicate through. Hope you enjoying your meeting :D
            </h3>
            <h3 style={{ marginTop: '0', marginBottom: '3%' }}>
              Once you've met, please click this button. 
            </h3>
            <button onClick={metOnClick} className="ui button basic blue">Met</button>
          </Fragment>
        ) : userType === MET ? (
          <Fragment>
            <h3>
              Hope your meeting with {otherName} went well! 
              You can fill out the feedback form to let us know how to improve
              your experience. Afterwards, you can match with more people.
            </h3>
            <div className='met-buttons'>
              <button className="ui button basic blue big">
                <Link to="/feedback" className="reg">
                  Feedback
                </Link>
              </button>
            </div>
          </Fragment>
        ) : (
          <h3>
            Have a question? Contact us at <u>founders.dayzero@gmail.com</u>
          </h3>
        )}
        {!loading && !membersLoading && isAuthenticated ? (
          membersData[0].user && membersData[0].user._id ? (
            <div className="group-container ui equal width grid">
              <div className='commonalities'>
                <p><b>Shared categories:</b> {strListFormat(categories)}</p>
                <p><b>Shared activities:</b> {strListFormat(activities)}</p>
                <p><b>Shared times:</b> {strListFormat(times.map(formatTime))}</p>
              </div>
              {memberComponents}
            </div>
          ) : null
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
  archiveGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCurrentGroup,
  getMembersProfiles,
  archiveGroup
})(Group);
