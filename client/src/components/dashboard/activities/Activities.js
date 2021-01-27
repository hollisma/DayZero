import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitActivities, changeActivities } from "../../../actions/matchInfo";
import { ACTIVITIES } from "../../../utils/consts";

import "./Activities.css";

const Activities = ({ submitActivities, changeActivities, matchInfo: { activities } }) => {
  const ids = ['Walk', 'Meal', 'Call']

  let activitiesValues = activities ? Object.keys(activities).map(k => activities[k]) : [];
  let activitiesSet = activities ? new Set(activitiesValues) : new Set();

  const onChange = e => {
    if (e.target.checked && !activitiesSet.has(e.target.name)) {
      activitiesSet.add(e.target.name)
    }
    if (!e.target.checked && activitiesSet.has(e.target.name)) {
      activitiesSet.delete(e.target.name)
    }
    changeActivities(Array.from(activitiesSet))
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
              checked={activitiesSet.has(ids[0])}
              onChange={e=>onChange(e)}
            />
            <label htmlFor={ids[0]}>Activity 1 {ACTIVITIES[0]}</label>
          </div>  
          <div>
            <input 
              id={ids[1]} 
              name={ids[1]} 
              type='checkbox' 
              checked={activitiesSet.has(ids[1])}
              onChange={e=>onChange(e)}
            />
            <label htmlFor={ids[1]}>Activity 2 {ACTIVITIES[1]}</label>
          </div>  
          <div>
            <input 
              id={ids[2]} 
              name={ids[2]} 
              type='checkbox' 
              checked={activitiesSet.has(ids[2])}
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
  changeActivities: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  matchInfo: state.matchInfo
});

export default connect(mapStateToProps, { submitActivities, changeActivities })(Activities);
