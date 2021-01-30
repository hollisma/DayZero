import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitActivities, changeActivities, getMatchInfo } from "../../../actions/matchInfo";
import { ACTIVITIES } from "../../../utils/consts";

import "./Activities.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Activities = ({ 
  matchInfo: { activities, loading }, 
  submitActivities, 
  changeActivities, 
  getMatchInfo
}) => {
  if (loading) {
    getMatchInfo();
  }

  const [agreement, setAgreement] = useState(false)

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
    if (!agreement) {
      MySwal.fire({
        title:
          "Please read and accept the social distancing agreement.",
          // "Please click the link in the confirmation email we just sent you. Be sure to check your spam folder!",
        type: "info"
      });
    } else {
      submitActivities(activities)
    }
  }

  return (
    <div className="ui container activities-container">
      <h1 className="activities-header header">Activities</h1>
      <p className='activities-info'>
        What activities are you comfortable with to meet someone? 
      </p>
      <div>
        <form className='activities-selector'>
          <div className='activity-card'>
            <input 
              id={ids[0]} 
              name={ids[0]} 
              type='checkbox' 
              checked={activitiesSet.has(ids[0])}
              onChange={e=>onChange(e)}
            />
            <label htmlFor={ids[0]}>
              <img src={require("../../../img/walk.svg")} className='activity-image' alt='walk' width='80%' />
            </label>
            <div className='activity-label'>{ACTIVITIES[0]}</div>
          </div>  
          <div className='activity-card'>
            <input 
              id={ids[1]} 
              name={ids[1]} 
              type='checkbox' 
              checked={activitiesSet.has(ids[1])}
              onChange={e=>onChange(e)}
            />
            <label htmlFor={ids[1]}>
              <img src={require("../../../img/meal.svg")} className='activity-image' alt='meal' width='80%' />
            </label>
            <div className='activity-label'>{ACTIVITIES[1]}</div>
          </div>  
          <div className='activity-card'>
            <input 
              id={ids[2]} 
              name={ids[2]} 
              type='checkbox' 
              checked={activitiesSet.has(ids[2])}
              onChange={e=>onChange(e)}
            />
            <label htmlFor={ids[2]}>
              <img src={require("../../../img/call.svg")} className='activity-image' alt='call' width='80%' />
            </label>
            <div className='activity-label'>{ACTIVITIES[2]}</div>
          </div>  
        </form>
      </div>
      <div className='activities-bottom-section'>
        {/* <input id='agreement' type='checkbox' checked={agreement} onClick={()=>setAgreement(!agreement)} />
        <label htmlFor='agreement'>I agree to perform social distancing during any activity I select. </label> */}
        <label class="label">
          <div class="toggle">
            <input 
              class="toggle-state" 
              type="checkbox" 
              name="check" 
              value="check" 
              checked={agreement} 
              onChange={()=>setAgreement(!agreement)} 
            />
            <div class="toggle-inner">
              <div class="indicator"></div>
            </div>
            <div class="active-bg"></div>
          </div>
          <div class="label-text">I agree to perform social distancing during any activity I select.</div>
        </label>

        <button
          className="ui green basic button my-1 right floated"
          onClick={()=>onSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

Activities.propTypes = {
  submitActivities: PropTypes.func.isRequired,
  changeActivities: PropTypes.func.isRequired,
  getMatchInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  matchInfo: state.matchInfo
});

export default connect(mapStateToProps, { 
  submitActivities, 
  changeActivities, 
  getMatchInfo 
})(Activities);
