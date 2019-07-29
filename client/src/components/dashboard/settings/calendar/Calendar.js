import React, { Fragment } from "react";
import CheckboxGroup from "./CheckboxGroup";
import PropTypes from "prop-types";

import "./Calendar.css";

const Calendar = props => {
  const handleSubmit = () => {};

  const days = new Array(7);
  for (let i = 0; i < days.length; i++) {
    days[i] = new Date();
    days[i].setDate(days[0].getDate() + i);
  }

  return (
    <Fragment>
      <h1 className="larger text-primary">Calendar</h1>
      <p>Which times are you available for?</p>
      <div className="options">
        <CheckboxGroup day={days[0].toString().substring(4, 10)} />
        <CheckboxGroup day={days[1].toString().substring(4, 10)} />
        <CheckboxGroup day={days[2].toString().substring(4, 10)} />
        <CheckboxGroup day={days[3].toString().substring(4, 10)} />
        <CheckboxGroup day={days[4].toString().substring(4, 10)} />
        <CheckboxGroup day={days[5].toString().substring(4, 10)} />
        <CheckboxGroup day={days[6].toString().substring(4, 10)} />
      </div>
      <div>
        <button
          className="ui green basic button my-1 right floated"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </Fragment>
  );
};

Calendar.propTypes = {};

export default Calendar;
