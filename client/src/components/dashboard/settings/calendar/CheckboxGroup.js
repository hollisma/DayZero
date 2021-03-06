import React from "react";
import PropTypes from "prop-types";
// import moment from "moment";
import { connect } from "react-redux";
import { changeSchedule } from "../../../../actions/schedule";
import { TIME1, TIME2 } from "../../../../utils/consts";

import "./Calendar.css";

const CheckboxGroup = ({ day, changeSchedule, schedule: { schedule } }) => {
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

  // day = moment()
  //   .add(day, "d")
  //   .format("MM-DD-YYYY");
  // const id1 = day + "," + TIME1;
  // const id2 = day + "," + TIME2;
  let day3 = new Date();
  day3.setDate(day3.getDate() + day);
  const id1 = dayToID(day3) + "," + TIME1;
  const id2 = dayToID(day3) + "," + TIME2;

  let arr = schedule ? Object.keys(schedule).map(k => schedule[k]) : [];
  let scheduleSet = schedule ? new Set(arr) : new Set();

  const onChange = e => {
    if (e.target.checked && !scheduleSet.has(e.target.name)) {
      scheduleSet.add(e.target.name);
    }
    if (!e.target.checked && scheduleSet.has(e.target.name)) {
      scheduleSet.delete(e.target.name);
    }
    changeSchedule(Array.from(scheduleSet));
  };

  return (
    <form className="column">
      {/* <p className="text">{moment(day).format("dddd, MMM D")}</p> */}
      <p className="text">{dayToString(day3)}</p>
      <div className="inputGroup">
        <input
          id={id1}
          name={id1}
          type="checkbox"
          checked={scheduleSet.has(id1)}
          onChange={e => onChange(e)}
        />
        <label htmlFor={id1}>{TIME1}</label>
      </div>
      <div className="inputGroup">
        <input
          id={id2}
          name={id2}
          type="checkbox"
          checked={scheduleSet.has(id2)}
          onChange={e => onChange(e)}
        />
        <label htmlFor={id2}>{TIME2}</label>
      </div>
    </form>
  );
};

CheckboxGroup.propTypes = {
  day: PropTypes.number.isRequired,
  schedule: PropTypes.object.isRequired,
  changeSchedule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule
});

export default connect(mapStateToProps, { changeSchedule })(CheckboxGroup);
