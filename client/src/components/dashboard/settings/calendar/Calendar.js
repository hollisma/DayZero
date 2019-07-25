import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./Calendar.css";

const Calendar = props => {
  return (
    <Fragment>
      <h1 className="larger text-primary">Calendar</h1>
      <p>Which times are you available for?</p>
      <div className="options">
        <form className="column">
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

        <form className="column">
          <div className="inputGroup">
            <input id="option4" name="option1" type="checkbox" />
            <label for="option4">Option One</label>
          </div>
          <div className="inputGroup">
            <input id="option5" name="option2" type="checkbox" />
            <label for="option5">Option Two</label>
          </div>
          <div className="inputGroup">
            <input id="option6" name="option3" type="checkbox" />
            <label for="option6">Option Three</label>
          </div>
        </form>

        <form className="column">
          <div className="inputGroup">
            <input id="option7" name="option1" type="checkbox" />
            <label for="option7">Option One</label>
          </div>
          <div className="inputGroup">
            <input id="option8" name="option2" type="checkbox" />
            <label for="option8">Option Two</label>
          </div>
          <div className="inputGroup">
            <input id="option9" name="option3" type="checkbox" />
            <label for="option9">Option Three</label>
          </div>
        </form>

        <form className="column">
          <div className="inputGroup">
            <input id="option7" name="option1" type="checkbox" />
            <label for="option7">Option One</label>
          </div>
          <div className="inputGroup">
            <input id="option8" name="option2" type="checkbox" />
            <label for="option8">Option Two</label>
          </div>
          <div className="inputGroup">
            <input id="option9" name="option3" type="checkbox" />
            <label for="option9">Option Three</label>
          </div>
        </form>

        <form className="column">
          <div className="inputGroup">
            <input id="option7" name="option1" type="checkbox" />
            <label for="option7">Option One</label>
          </div>
          <div className="inputGroup">
            <input id="option8" name="option2" type="checkbox" />
            <label for="option8">Option Two</label>
          </div>
          <div className="inputGroup">
            <input id="option9" name="option3" type="checkbox" />
            <label for="option9">Option Three</label>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Calendar.propTypes = {};

export default Calendar;
