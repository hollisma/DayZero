import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { changeSchedule } from "../../../../actions/schedule";
import { TIME1, TIME2, TIME3 } from "../../../../actions/types";

import "./Calendar.css";

const CheckboxGroup = ({ 
  day, 
  changeSchedule, 
  schedule: {schedule, loading }
}) => {
  day = moment().add(day, "d").format("MM-DD-YYYY");
  const id1 = day + "," + TIME1;
  const id2 = day + "," + TIME2;
  const id3 = day + "," + TIME3;

  console.log(typeof schedule, schedule)
  let scheduleSet = schedule && !loading ? new Set(schedule) : new Set();
  
  // TODO: New set is being created each time, so it's not storing the state...
  //       Or something like that...
  // TODO: Also, after submitting, the response is stored as 'schedule', but it's an object with a bunch of other junk

  const onChange = (e) => {
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
      <p className="text">{moment(day).format("MMM D")}</p>
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
      <div className="inputGroup">
        <input
          id={id3}
          name={id3}
          type="checkbox"
          checked={scheduleSet.has(id3)}
          onChange={e => onChange(e)}
        />
        <label htmlFor={id3}>{TIME3}</label>
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
