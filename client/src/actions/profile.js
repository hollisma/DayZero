import axios from "axios";
import {
  AUTH_ERROR,
  USER_UPDATED,
  GET_PROFILE,
  GET_DISPLAY_PROFILE,
  PROFILE_ERROR,
  LIKED,
  UNLIKED
} from "./types";
import config from "../config/config.json";

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
      window.location.href = "/dashboard/#";
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

export const getDisplayProfile = user_id => async dispatch => {
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

export const getUserProfile = user_id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.get("/api/profile/user/" + user_id, config);

    return res.data;
  } catch (err) {
    MySwal.fire({ title: err.response.statusText, type: "error" });
  }
};

export const getAllProfiles = () => async dispatch => {
  var token = localStorage.token || "";

  try {
    const reqConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASS
    });

    const resAdminToken = await axios.post("/api/auth", body, reqConfig);

    const adminToken = resAdminToken.data.token;
    axios.defaults.headers.common["x-auth-token"] = adminToken;

    const resProfiles = await axios.get("/api/profile/admin");
    axios.defaults.headers.common["x-auth-token"] = token;

    return resProfiles.data;
  } catch (err) {
    MySwal.fire({ title: err.response.statusText, type: "error" });
  }
};

export const getRandomProfiles = (num, id) => async dispatch => {
  var token = localStorage.token || "";

  try {
    const reqConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASS
    });

    const resAdminToken = await axios.post("/api/auth", body, reqConfig);
    const adminToken = resAdminToken.data.token;
    axios.defaults.headers.common["x-auth-token"] = adminToken;

    var resProfiles = await axios.get("/api/profile/admin");
    resProfiles = resProfiles.data;
    axios.defaults.headers.common["x-auth-token"] = token;

    var arr = [];
    // minus 2 for admin and current user
    var numProfiles = Math.min(resProfiles.length - 2, num);
    const validProfile = prof => {
      return (
        !arr.includes(rand) &&
        prof &&
        prof.user &&
        prof.user._id &&
        prof.user._id !== id &&
        prof.user.user_type !== "ADMIN" &&
        prof.user.name
      );
    };
    for (var i = 0; i < numProfiles; i++) {
      var rand = Math.floor(Math.random() * resProfiles.length);
      while (!validProfile(resProfiles[rand])) {
        rand = Math.floor(Math.random() * resProfiles.length);
      }
      // Don't directly add user info to make it easier to check if rand has already been used
      arr.push(rand);
    }

    for (i = 0; i < numProfiles; i++) {
      arr[i] = resProfiles[arr[i]];
    }

    return arr;
  } catch (err) {
    if (err.response && err.response.statusText) {
      MySwal.fire({ title: err.response.statusText, type: "error" });
    } else {
      console.log(err);
    }
  }
};

export const getSearchProfiles = categories => async dispatch => {
  var token = localStorage.token || "";

  try {
    const reqConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASS
    });

    const resAdminToken = await axios.post("/api/auth", body, reqConfig);
    const adminToken = resAdminToken.data.token;
    axios.defaults.headers.common["x-auth-token"] = adminToken;

    var resProfiles = await axios.get("/api/profile/admin");
    resProfiles = resProfiles.data;
    axios.defaults.headers.common["x-auth-token"] = token;

    var hasCategories = (cats, profile) => {
      var profileCats = profile.categories.map(s => s.toLowerCase());
      let hasAllCats = true;
      cats.forEach(cat => {
        if (!profileCats.includes(cat.toLowerCase())) {
          hasAllCats = false;
        }
      });
      if (profile && profile.user && profile.user.user_type === "ADMIN") {
        return false;
      }
      return hasAllCats;
    };

    var arr = [];
    for (var i = 0; i < resProfiles.length; i++) {
      if (
        hasCategories(categories, resProfiles[i]) &&
        resProfiles[i].user &&
        resProfiles[i].user._id &&
        resProfiles[i].user.name
      ) {
        arr.push(resProfiles[i]);
      }
    }

    return arr;
  } catch (err) {
    if (err.response && err.response.statusText) {
      MySwal.fire({ title: err.response.statusText, type: "error" });
    } else {
      console.log(err);
    }
  }
};

export const like = profile => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (!profile.user) return false;

  const body = JSON.stringify({ user_id: profile.user.id });

  const res = await axios.post("/api/profile/like", body, config);

  dispatch({
    type: LIKED,
    payload: res.data
  });
  return false;
};

export const unlike = profile => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (!profile.user) return false;

  const body = JSON.stringify({ user_id: profile.user.id });

  const res = await axios.post("/api/profile/unlike", body, config);

  dispatch({
    type: UNLIKED,
    payload: res.data
  });
  return false;
};
