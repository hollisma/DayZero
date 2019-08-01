import React from "react";
import PropTypes from "prop-types";
import { TIME1, TIME2, TIME3 } from "../../../../actions/types";

import "./Calendar.css";

const CheckboxGroup = ({ day, onChange }) => {
  const id1 = day + "," + TIME1;
  const id2 = day + "," + TIME2;
  const id3 = day + "," + TIME3;

  return (
    <form className="column">
      <p className="text">{day.format("MM D")}</p>
      <div className="inputGroup">
        <input
          id={id1}
          name={id1}
          type="checkbox"
          onChange={e => onChange(e)}
        />
        <label htmlFor={id1}>{TIME1}</label>
      </div>
      <div className="inputGroup">
        <input
          id={id2}
          name={id2}
          type="checkbox"
          onChange={e => onChange(e)}
        />
        <label htmlFor={id2}>{TIME2}</label>
      </div>
      <div className="inputGroup">
        <input
          id={id3}
          name={id3}
          type="checkbox"
          onChange={e => onChange(e)}
        />
        <label htmlFor={id3}>{TIME3}</label>
      </div>
    </form>
  );
};

CheckboxGroup.propTypes = {};

export default CheckboxGroup;
