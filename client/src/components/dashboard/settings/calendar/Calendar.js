import React, { Fragment } from "react";
import CheckboxGroup from "./CheckboxGroup";
import PropTypes from "prop-types";

import "./Calendar.css";

const Calendar = props => {
  return (
    <Fragment>
      <h1 className="larger text-primary">Calendar</h1>
      <p>Which times are you available for?</p>
      <div className="options">
        <CheckboxGroup day="July 25" />
        <CheckboxGroup day="July 26" />
        <CheckboxGroup day="July 27" />
        <CheckboxGroup day="July 28" />
        <CheckboxGroup day="July 29" />
      </div>
    </Fragment>
  );
};

Calendar.propTypes = {};

export default Calendar;
