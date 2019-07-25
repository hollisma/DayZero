import React from "react";
import PropTypes from "prop-types";

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
        <label for={id1}>Breakfast</label>
      </div>
      <div className="inputGroup">
        <input id={id2} name={id2} type="checkbox" />
        <label for={id2}>Lunch</label>
      </div>
      <div className="inputGroup">
        <input id={id3} name={id3} type="checkbox" />
        <label for={id3}>Dinner</label>
      </div>
    </form>
  );
};

CheckboxGroup.propTypes = {};

export default CheckboxGroup;
