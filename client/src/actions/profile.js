import axios from "axios";
import {
  AUTH_ERROR,
  USER_UPDATED,
  GET_PROFILE,
  GET_DISPLAY_PROFILE,
  PROFILE_ERROR
} from "./types";

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

export const updateUser = userData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/users", userData, config);

    dispatch({
      type: USER_UPDATED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = (profileData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", profileData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    // If creating profile for first time, redirect to dashboard
    if (!edit) {
      window.location.href = "/dashboard";
    }
    let msg = edit ? "Profile Updated" : "Profile Created";

    // Throw toast
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: "success",
      title: msg
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getUserProfile = user_id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.get("/api/profile/user/" + user_id, config);

    dispatch({
      type: GET_DISPLAY_PROFILE,
      payload: res.data
    });
  } catch (err) {
    MySwal.fire({ title: err.response.statusText, type: "error" });
  }
};
