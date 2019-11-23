import {
  GET_PROFILE,
  GET_DISPLAY_PROFILE,
  PROFILE_ERROR,
  LOGOUT,
  LIKED,
  UNLIKED
} from "../actions/types";

const initialState = {
  profile: null,
  display_profile: null,
  loading: true,
  loading_display: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_DISPLAY_PROFILE:
      return {
        ...state,
        display_profile: payload,
        display_loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile: null,
        display_profile: null,
        loading: false,
        display_loading: false
      };
    case LOGOUT:
      return {
        ...state,
        error: payload,
        profile: null,
        display_profile: null,
        loading: true,
        display_loading: true
      };
    case LIKED:
    case UNLIKED:
      return {
        ...state,
        display_profile: payload
      };
    default:
      return state;
  }
}
