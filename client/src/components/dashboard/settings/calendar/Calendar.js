import React, { useState, Fragment, useEffect } from "react";
import CheckboxGroup from "./CheckboxGroup";
import moment from "moment";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createSchedule,
  getCurrentSchedule
} from "../../../../actions/schedule";

import "./Calendar.css";

const Calendar = ({
  schedule: { schedule, loading },
  createSchedule,
  getCurrentSchedule,
  history
}) => {
  const [timeData, setTimeData] = useState({
    times: []
  });

  useEffect(() => {
    getCurrentSchedule();

    setTimeData({
      times: loading || !schedule || !schedule.times ? [] : schedule.times
    });
  }, [loading, getCurrentSchedule]);

  const { times } = timeData;

  const onChange = e => {
    const checked = e.target.checked;
    const name = e.target.name;
    const index = times.indexOf(name);
    if (index === -1 && checked) {
      times.push(name);
    } else if (index > -1 && !checked) {
      times.splice(index, 1);
    }
    console.log(times)
    setTimeData({ times });
  };

  const onSubmit = () => {
    createSchedule(timeData, history, true);
  };

  // // Create array of days
  // const days = new Array(7);
  // for (let i = 0; i < days.length; i++) {
  //   days[i] = moment();
  //   days[i].add(i, "d").format("MM DD YYYY");
  //   console.log('hello')
  // }

  // TODO: pass in filtered times into each checkbox
  //       need to know how to properly use momentjs to compare dates

  // TODO: implement SCHEDULED user type and create CreateSchedule component
  //       similar to Create/EditProfile

  return (
    <Fragment>
      <h1 className="larger text-primary">Calendar</h1>
      <p>Which times are you available for?</p>
      <div className="options">
        <CheckboxGroup day={0} onChange={onChange} />
        <CheckboxGroup day={1} onChange={onChange} />
        <CheckboxGroup day={2} onChange={onChange} />
        <CheckboxGroup day={3} onChange={onChange} />
        <CheckboxGroup day={4} onChange={onChange} />
        <CheckboxGroup day={5} onChange={onChange} />
        <CheckboxGroup day={6} onChange={onChange} />
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
