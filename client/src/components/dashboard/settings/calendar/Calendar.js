import React, { Fragment } from "react";
import CheckboxGroup from "./CheckboxGroup";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createSchedule,
  getCurrentSchedule
} from "../../../../actions/schedule";

import "./Calendar.css";

const Calendar = ({
  schedule: { schedule },
  createSchedule,
  history
}) => {

  const onSubmit = () => {
    createSchedule({ times: schedule }, history, true);
  };

  return (
    <Fragment>
      <h1 className="larger text-primary">Calendar</h1>
      <p>Which times are you available for?</p>
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
    </Fragment>
  );
};

Calendar.propTypes = {
  createSchedule: PropTypes.func.isRequired,
  getCurrentSchedule: PropTypes.func.isRequired,
  schedule: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule
});

export default connect(
  mapStateToProps,
  { createSchedule, getCurrentSchedule }
)(withRouter(Calendar));
