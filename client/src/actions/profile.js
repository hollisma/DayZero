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
    })
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
