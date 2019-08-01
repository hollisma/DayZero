import { GET_SCHEDULE, SCHEDULE_ERROR } from "../actions/types";

const initialState = { schedule: null, loading: true };

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: payload,
        loading: false
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