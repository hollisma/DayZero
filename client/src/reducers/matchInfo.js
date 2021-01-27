import {
  GET_MATCH_INFO,
  CHANGE_SCHEDULE,
  SCHEDULE_ERROR,
  SUBMIT_ACTIVITIES,
  CHANGE_ACTIVITIES,
  ACTIVITIES_ERROR,
  LOGOUT
} from "../actions/types";

const initialState = { schedule: {}, activities: {}, loading: true };

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MATCH_INFO:
      return {
        ...state,
        schedule: payload.times,
        activities: payload.activities,
        loading: false
      };
    case CHANGE_SCHEDULE:
      return {
        ...state,
        schedule: payload
      };
    case SCHEDULE_ERROR:
    case ACTIVITIES_ERROR:
      return {
        ...state,
        schedule: null,
        activities: null, 
        loading: false
      };
    case SUBMIT_ACTIVITIES:
      return {
        ...state, 
        activities: payload, 
        loading: false
      };
    case CHANGE_ACTIVITIES:
      return {
        ...state, 
        activities: payload
      };
    case LOGOUT:
      return {
        ...state,
        schedule: null,
        activities: null, 
        loading: true
      };
    default:
      return state;
  }
}
