import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res_token = await axios.post("/api/users", body, config);
    localStorage.setItem("token", res_token.data.token);
    setAuthToken(localStorage.token);

    const res_user = await axios.get("/api/auth");

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { ...res_token.data, user: res_user.data }
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        MySwal.fire({
          title: error.msg,
          type: "error"
        })
      );
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res_token = await axios.post("/api/auth", body, config);
    localStorage.setItem("token", res_token.data.token);
    setAuthToken(localStorage.token);

    const res_user = await axios.get("/api/auth");

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { ...res_token.data, user: res_user.data }
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        MySwal.fire({
          title: error.msg,
          type: "error"
        })
      );
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const glogin = response => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    cache: "default"
  };

  const body = JSON.stringify({ access_token: response.accessToken });

  try {
    const res = await axios.post("/api/auth/google", body, config);
    const token = res.data.token;

    localStorage.setItem("token", token);
    setAuthToken(localStorage.token);

    const user = await axios.get("/api/auth");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user,
        token
      }
    });
    window.location.href = "/dashboard/#";
  } catch (err) {
    if (err && err.response && err.response.data) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error =>
          MySwal.fire({
            title: error.msg,
            type: "error"
          })
        );
      }
    }

    console.log(err);

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const fblogin = response => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    cache: "default"
  };

  const body = JSON.stringify({ access_token: response.accessToken });

  try {
    const res = await axios.post("/api/auth/facebook", body, config);
    const token = res.data.token;

    localStorage.setItem("token", token);
    setAuthToken(localStorage.token);

    const user = await axios.get("/api/auth");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user,
        token
      }
    });
    window.location.href = "/dashboard/#";
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        MySwal.fire({
          title: error.msg,
          type: "error"
        })
      );
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

//Verify users
export const verification = token => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // const body = JSON.stringify({ token, id });
  const body = JSON.stringify({ token });

  try {
    console.log("hi");
    let user = await axios.post("/api/auth/verification", body, config);
    user = user.data;
    console.log("hii", user);

    dispatch({
      type: VERIFICATION_SUCCESS,
      payload: user
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        MySwal.fire({
          title: error.msg,
          type: "error"
        })
      );
    }

    dispatch({
      type: VERIFICATION_FAIL
    });
  }
};
