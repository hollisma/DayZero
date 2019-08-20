import { GET_PROFILE, PROFILE_ERROR, LOGOUT } from "../actions/types";

const initialState = { profile: null, loading: true, error: {} };

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
    case LOGOUT:
      return {
        ...state,
        error: payload,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
