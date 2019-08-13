import { GET_GROUP, GROUP_ERROR } from "../actions/types";

const initialState = { members: [], active: false, date: null, loading: true };

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUP:
      return {
        ...state,
        members: payload.members,
        active: payload.active,
        date: payload.date,
        loading: false
      };
    case GROUP_ERROR:
      return {
        ...state,
        members: [],
        active: false,
        date: null,
        loading: false
      };
    default:
      return state;
  }
}
