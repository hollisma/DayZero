import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(() =>
        MySwal.fire({ title: "Passwords do not match", type: "error" })
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, state: err.response.status }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    // Could throw a success SWAL or use an integrated thing on the SWAL website

    // If creating profile for first time, redirect to dashboard
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(() =>
        MySwal.fire({ title: "Passwords do not match", type: "error" })
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
