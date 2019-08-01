import React from "react";
import PropTypes from "prop-types";
import { TIME1, TIME2, TIME3 } from "../../../../actions/types";

import "./Calendar.css";

const CheckboxGroup = ({ day }) => {
  const id1 = day + "1";
  const id2 = day + "2";
  const id3 = day + "3";

  return (
    <form className="column">
      <p className="text">{day}</p>
      <div className="inputGroup">
        <input id={id1} name={id1} type="checkbox" />
        <label htmlFor={id1}>{TIME1}</label>
      </div>
      <div className="inputGroup">
        <input id={id2} name={id2} type="checkbox" />
        <label htmlFor={id2}>{TIME2}</label>
      </div>
      <div className="inputGroup">
        <input id={id3} name={id3} type="checkbox" />
        <label htmlFor={id3}>{TIME3}</label>
      </div>
    </form>
  );
};

CheckboxGroup.propTypes = {};

export default CheckboxGroup;
