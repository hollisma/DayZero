import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./Calendar.css";

const Calendar = props => {
  return (
    <Fragment>
      <h1 className="larger text-primary">Calendar</h1>
      <form className="form">
        <h2>Checkboxes</h2>
        <div className="inputGroup">
          <input id="option1" name="option1" type="checkbox" />
          <label for="option1">Option One</label>
        </div>

        <div className="inputGroup">
          <input id="option2" name="option2" type="checkbox" />
          <label for="option2">Option Two</label>
        </div>

        <div className="inputGroup">
          <input id="option3" name="option3" type="checkbox" />
          <label for="option3">Option Three</label>
        </div>
      </form>
    </Fragment>
  );
};

Calendar.propTypes = {};

export default Calendar;
