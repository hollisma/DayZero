import React, { Fragment } from "react";
import CheckboxGroup from "./CheckboxGroup";
import moment from "moment";
import PropTypes from "prop-types";

import "./Calendar.css";

const Calendar = props => {
  const handleSubmit = () => {};

  // Create array of Date objects
  const days = new Array(7);
  for (let i = 0; i < days.length; i++) {
    days[i] = moment();
    days[i].add(i, "d");
  }

  return (
    <Fragment>
      <h1 className="larger text-primary">Calendar</h1>
      <p>Which times are you available for?</p>
      <div className="options">
        <CheckboxGroup day={days[0].format("MMMM D")} />
        <CheckboxGroup day={days[1].format("MMMM D")} />
        <CheckboxGroup day={days[2].format("MMMM D")} />
        <CheckboxGroup day={days[3].format("MMMM D")} />
        <CheckboxGroup day={days[4].format("MMMM D")} />
        <CheckboxGroup day={days[5].format("MMMM D")} />
        <CheckboxGroup day={days[6].format("MMMM D")} />
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
