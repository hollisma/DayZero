import { GET_GROUP, GROUP_ERROR, LOAD_MEMBERS, LOGOUT } from "../actions/types";

const initialState = {
  members: [],
  membersData: [{}, {}],
  active: false,
  categories: [],
  activities: [],
  times: [],
  loading: true,
  membersLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUP:
      return {
        ...state,
        members: payload.members,
        active: payload.active,
        categories: payload.categories,
        activities: payload.activities,
        times: payload.times && payload.times.slice(0, 5),
        loading: false
      };
    case LOAD_MEMBERS:
      return {
        ...state,
        membersData: payload,
        membersLoading: false
      };
    case GROUP_ERROR:
      return {
        ...state,
        members: [],
        membersData: [{}, {}],
        active: false,
        categories: [],
        activities: [],
        times: [],
        loading: false,
        membersLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        members: [],
        membersData: [{}, {}],
        active: false,
        categories: [],
        activities: [],
        times: [],
        loading: true,
        membersLoading: true
      };
    default:
      return state;
  }
}
