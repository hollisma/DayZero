import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  USER_LOADED,
  USER_UPDATED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  verificationFailed: false,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
    case USER_UPDATED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        verificationFailed: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        verificationFailed: false,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        verificationFailed: false
      };
    case VERIFICATION_FAIL:
      return {
        ...state,
        verificationFailed: true
      };
    default:
      return state;
  }
}
