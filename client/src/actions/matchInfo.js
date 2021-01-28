import axios from "axios";
import { 
  GET_MATCH_INFO, 
  CHANGE_SCHEDULE, 
  SCHEDULE_ERROR, 
  SUBMIT_ACTIVITIES,
  ACTIVITIES_ERROR,
  CHANGE_ACTIVITIES
} from "./types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const getMatchInfo = () => async dispatch => {
  try {
    const res = await axios.get("/api/matchInfo/me");

    dispatch({
      type: GET_MATCH_INFO,
      payload: {
        times: res.data.times, 
        activities: res.data.activities
      }
    });
  } catch (err) {
    if (err.response.status === 400) {
      MySwal.fire({ title: err.response.statusText, type: "error" });
    }

    dispatch({
      type: SCHEDULE_ERROR
    });
  }
};

export const createSchedule = times => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/matchInfo", { times }, config);

    dispatch({
      type: GET_MATCH_INFO,
      payload: {
        times: res.data.times, 
        activities: res.data.activities
      }
    });

    window.location.href = "/dashboard/#";

    // // Throw toast
    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: "top-end",
    //   showConfirmButton: false,
    //   timer: 3000
    // });

    // Toast.fire({
    //   type: "success",
    //   title: "Schedule Updated"
    // });
  } catch (err) {
    if (
      err &&
      err.response &&
      (err.response.status === 400 || err.response.status === 401)
    ) {
      MySwal.fire({
        // title: err.response.statusText,
        title: 'Not Verified',
        text: err.response.data,
        type: "error"
      });
    }

    dispatch({
      type: SCHEDULE_ERROR
    });
  }
};

export const changeSchedule = schedule => async dispatch => {
  dispatch({
    type: CHANGE_SCHEDULE,
    payload: schedule
  });
};

export const submitActivities = activities => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    const res = await axios.post("/api/matchInfo", { activities }, config);
    
    dispatch({
      type: SUBMIT_ACTIVITIES, 
      payload: res.data.activities
    })

    window.location.href = "/dashboard/schedule";
  } catch (err) {
    if (
      err &&
      err.response &&
      (err.response.status === 400 || err.response.status === 401)
    ) {
      MySwal.fire({
        // title: err.response.statusText,
        title: 'Not Verified',
        text: err.response.data,
        type: "error"
      })
    }

    dispatch({
      type: ACTIVITIES_ERROR
    })
  }
}

export const changeActivities = activities => async dispatch => {
  dispatch({
    type: CHANGE_ACTIVITIES,
    payload: activities
  })
}
