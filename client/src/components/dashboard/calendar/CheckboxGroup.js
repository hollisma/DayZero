import React from "react";
import PropTypes from "prop-types";
// import moment from "moment";
import { connect } from "react-redux";
import { changeSchedule } from "../../../actions/matchInfo";
import { TIMES, ACTIVITIES } from "../../../utils/consts";

import "./Calendar.css";

const CheckboxGroup = ({ day, changeSchedule, matchInfo: { schedule, activities } }) => {
  const dayToString = day => {
    var resultStr = "";
    const dayArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    resultStr +=
      dayArray[day.getDay()] +
      ", " +
      monthArray[day.getMonth()] +
      " " +
      day.getDate();
    return resultStr;
  };

  const dayToID = day => {
    var resultStr =
      day.getMonth() + 1 + "-" + day.getDate() + "-" + day.getFullYear();
    return resultStr;
  };

  let day2 = new Date();
  day2.setDate(day2.getDate() + day);
  const day2ID = dayToID(day2)

  let scheduleValues = Object.values(schedule)
  let scheduleSet = schedule ? new Set(scheduleValues) : new Set();

  // Filter via activities
  let actVals = Object.values(activities)
  let sectionsInclude = []
  if (actVals.includes(ACTIVITIES[0]) || actVals.includes(ACTIVITIES[2])) {
    sectionsInclude.push(1)
  }
  if (actVals.includes(ACTIVITIES[1])) {
    sectionsInclude.push(2)
  }

  let times = []

  // Section 1
  let values = Object.values(schedule)
  let startLen = values.length
  const goodTimes1 = [TIMES[0], TIMES[2], TIMES[4]]
  if (sectionsInclude.includes(1)) {
    times = times.concat(goodTimes1)
  } else {
    // Filter schedule
    values = values.filter(v => !goodTimes1.includes(v.split(',')[1]))
  }

  // Section 2
  const goodTimes2 = [TIMES[1], TIMES[3]]
  if (sectionsInclude.includes(2)) {
    if (times.length > 0) {
      times.splice(1, 0, TIMES[1])
      times.splice(3, 0, TIMES[3])
    } else {
      times = times.concat(goodTimes2)
    }
  } else {
    // Filter schedule
    values = values.filter(v => !goodTimes2.includes(v.split(',')[1]))
  }
  if (values.length < startLen) {
    changeSchedule(values)
  }

  const ids = times.map(t => day2ID + ',' + t)

  const onChange = e => {
    if (e.target.checked && !scheduleSet.has(e.target.name)) {
      scheduleSet.add(e.target.name);
    }
    if (!e.target.checked && scheduleSet.has(e.target.name)) {
      scheduleSet.delete(e.target.name);
    }
    changeSchedule(Array.from(scheduleSet));
  };

  let inputGroups = ids.map((id, i) => (
    <div className="inputGroup" key={day+'/'+id}>
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={scheduleSet.has(id)}
        onChange={e => onChange(e)}
      />
      <label htmlFor={id}>{times[i]}</label>
    </div>
  ))

  return (
    <form className="column">
      <p className="text">{dayToString(day2)}</p>
      {inputGroups}
    </form>
  );
};

CheckboxGroup.propTypes = {
  day: PropTypes.number.isRequired,
  matchInfo: PropTypes.object.isRequired,
  changeSchedule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  matchInfo: state.matchInfo
});

export default connect(mapStateToProps, { changeSchedule })(CheckboxGroup);
