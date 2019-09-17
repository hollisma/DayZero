import React from "react";
import CheckboxGroup from "./CheckboxGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createSchedule,
  getCurrentSchedule
} from "../../../../actions/schedule";
import { PROFILED, SCHEDULED } from "../../../../utils/consts";

import "./Calendar.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Calendar = ({
  schedule: { schedule, loading },
  auth: { user },
  createSchedule,
  getCurrentSchedule
}) => {
  if (loading) getCurrentSchedule();

  const onSubmit = () => {
    if (user.user_type !== PROFILED && user.user_type !== SCHEDULED) {
      MySwal.fire({
        title: "Please fill out the feedback form",
        type: "info"
      });
    } else {
      createSchedule({ times: schedule });
    }
  };

  return (
    <div className="ui container">
      <h1 className="calendar-header">Calendar</h1>
      <p>
        Which times are you available for? You must fill out this section in
        order for us to match you. After matching you with a group, we will put
        everyone into a group chat for you guys to figure out the specific time
        and meeting location.
      </p>
      <div id="calendar" className="calendar chunk">
        <div className="options">
          <CheckboxGroup day={0} />
          <CheckboxGroup day={1} />
          <CheckboxGroup day={2} />
          <CheckboxGroup day={3} />
          <CheckboxGroup day={4} />
          <CheckboxGroup day={5} />
          <CheckboxGroup day={6} />
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
  getCurrentSchedule: PropTypes.func.isRequired,
  schedule: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createSchedule, getCurrentSchedule }
)(Calendar);
