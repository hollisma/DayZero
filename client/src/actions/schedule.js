import axios from "axios";
import { GET_SCHEDULE, CHANGE_SCHEDULE, SCHEDULE_ERROR } from "./types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const getCurrentSchedule = () => async dispatch => {
  try {
    const res = await axios.get("/api/schedule/me");

    dispatch({
      type: GET_SCHEDULE,
      payload: res.data
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

export const createSchedule = (
  times
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/schedule", times, config);

    dispatch({
      type: GET_SCHEDULE,
      payload: res.data
    });

    // Throw toast
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: "success",
      title: "Schedule Updated"
    })

  } catch (err) {
    if (err && err.response && err.response.status === 400) {
      MySwal.fire({ title: err.response.statusText, type: "error" });
    }

    dispatch({
      type: SCHEDULE_ERROR
    });
  }
};

export const changeSchedule = (
  schedule
) => async dispatch  => {
  dispatch({
    type: CHANGE_SCHEDULE, 
    payload: schedule
  })
}
