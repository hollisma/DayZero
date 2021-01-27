import React from "react";
import CheckboxGroup from "./CheckboxGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createSchedule,
  getMatchInfo
} from "../../../actions/matchInfo";
import { PROFILED, SCHEDULED, GROUPED, MET } from "../../../utils/consts";

import "./Calendar.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Calendar = ({
  matchInfo: { schedule, loading },
  auth: { user },
  createSchedule,
  getMatchInfo
}) => {
  if (loading) {
    getMatchInfo();
  }

  const onSubmit = () => {
    // ---------------------------------------------------------------------------------
    // DISABLE FEEDBACK
    // ---------------------------------------------------------------------------------
    // if (user.user_type !== PROFILED && user.user_type !== SCHEDULED) {
    if (
      user.user_type !== PROFILED &&
      user.user_type !== SCHEDULED &&
      user.user_type !== MET
    ) {
      if (user.user_type === GROUPED) {
        MySwal.fire({
          title: "Please meet with your group first",
          type: "info"
        });
      }
      // ---------------------------------------------------------------------------------
      // DISABLE FEEDBACK
      // ---------------------------------------------------------------------------------
      // } else if (user.user_type === MET) {
      //   MySwal.fire({
      //     title: "Please fill out the feedback form",
      //     type: "info"
      //   });
      // }
    } else {
      createSchedule(schedule);
    }
  };

  return (
    <div className="ui container">
      <h1 className="calendar-header">Calendar</h1>
      <p>
        After we match you with your day zero, we will connect the two of you
        over email. We also recommending that you fill out a quick bio below so
        that people know a bit more about you!
      </p>
      <div id="calendar" className="calendar chunk">
        <div className="options">
          <CheckboxGroup day={1} />
          <CheckboxGroup day={2} />
          <CheckboxGroup day={3} />
          <CheckboxGroup day={4} />
          <CheckboxGroup day={5} />
          <CheckboxGroup day={6} />
          <CheckboxGroup day={7} />
        </div>
        <div>
          <button
            className="ui green basic button my-1 right floated"
            onClick={() => onSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  createSchedule: PropTypes.func.isRequired,
  getMatchInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  matchInfo: state.matchInfo,
  auth: state.auth
});

export default connect(mapStateToProps, { createSchedule, getMatchInfo })(
  Calendar
);
