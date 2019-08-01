import axios from "axios";
import { GET_SCHEDULE, SCHEDULE_ERROR } from "./types";

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
  timeData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/schedule", timeData, config);

    dispatch({
      type: GET_SCHEDULE,
      payload: res.data
    });

    // Could throw a success SWAL or use a snackbar

    // If creating schedule for first time, redirect to dashboard
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    if (err.response.status === 400) {
      MySwal.fire({ title: err.response.statusText, type: "error" });
    }

    dispatch({
      type: SCHEDULE_ERROR
    });
  }
};