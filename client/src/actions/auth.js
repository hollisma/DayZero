import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
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
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

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
    // if (token) {
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
    window.location.href = "/dashboard";
    // }
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

export const fblogin = response => dispatch => {
  // const tokenBlob = new Blob(
  //   [JSON.stringify({ access_token: response.accessToken }, null, 2)],
  //   { type: "application/json" }
  // );
  // const options = {
  //   method: "POST",
  //   body: tokenBlob,
  //   mode: "cors",
  //   cache: "default"
  // };
  // fetch("http://localhost:4000/api/auth/facebook", options).then(r => {
  //   const token = r.headers.get("x-auth-token");
  //   r.json().then(user => {
  //     if (token) {
  //       localStorage.setItem("token", token);
  //       setAuthToken(localStorage.token);
  //       dispatch({
  //         type: REGISTER_SUCCESS,
  //         payload: {
  //           user,
  //           token
  //         }
  //       });
  //     }
  //   });
  // });
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
