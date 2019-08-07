import { GET_SCHEDULE, CHANGE_SCHEDULE, SCHEDULE_ERROR } from "../actions/types";

const initialState = { schedule: [], loading: true };

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: payload,
        loading: false
      };
    case CHANGE_SCHEDULE: 
      return {
        ...state, 
        schedule: payload
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
        schedule: null,
        loading: false
      };
    default:
      return state;
  }
}
