import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitActivities } from "../../../actions/schedule";
import { ACTIVITIES } from "../../../utils/consts";

import "./Activities.css";

const Activities = ({ submitActivities }) => {
  const ids = [0, 1, 2]

  let activities = new Set()

  const onChange = e => {
    if (e.target.checked && !activities.has(e.target.name)) {
      activities.add(e.target.name)
    }
    if (!e.target.checked && activities.has(e.target.name)) {
      activities.delete(e.target.name)
    }
  }

  const onSubmit = () => {
    submitActivities(activities)
  }

  return (
    <div className="ui container">
      <h1>Activities</h1>
      <p>
        Some information about activities...
      </p>
      <div className='test'>
        <form>
          {/* image checkboxes: https://stackoverflow.com/questions/30663562/use-images-like-checkboxes */}
          <div>
            <input 
              id={ids[0]} 
              name={ids[0]} 
              type='checkbox' 
              onChange={e=>onChange(e)}
            />
            <label htmlFor={ids[0]}>Activity 1 {ACTIVITIES[0]}</label>
          </div>  
          <div>
            <input 
              id={ids[1]} 
              name={ids[1]} 
              type='checkbox' 
              onChange={e=>onChange(e)}
            />
            <label htmlFor={ids[1]}>Activity 2 {ACTIVITIES[1]}</label>
          </div>  
          <div>
            <input 
              id={ids[2]} 
              name={ids[2]} 
              type='checkbox' 
              onChange={e=>onChange(e)}
            />
            <label htmlFor={ids[2]}>Activity 3 {ACTIVITIES[2]}</label>
          </div>  
        </form>
        <div>
          <button
            className="ui green basic button my-1 right floated"
            onClick={()=>onSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

Activities.propTypes = {
  submitActivities: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  schedule: state.schedule
});

export default connect(mapStateToProps, { submitActivities })(Activities);
