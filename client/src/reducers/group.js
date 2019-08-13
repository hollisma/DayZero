import { GET_GROUP, GROUP_ERROR } from "../actions/types";

const initialState = { group: {}, loading: true };

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false
      };
    case GROUP_ERROR:
      return {
        ...state,
        group: null,
        loading: false
      };
    default:
      return state;
  }
}
