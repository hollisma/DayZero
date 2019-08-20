import axios from "axios";
import { GET_GROUP, GROUP_ERROR, LOAD_MEMBERS } from "./types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// Return an array of IDs of the group members
export const getCurrentGroup = () => async dispatch => {
  try {
    const res = await axios.get("/api/groups");

    let members = res.data.members || [];
    // 4 is the number of people per group
    while (members.length < 4) {
      members.push("");
    }

    dispatch({
      type: GET_GROUP,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 400) {
      MySwal.fire({ title: err.response.statusText, type: "error" });
    }

    dispatch({
      type: GROUP_ERROR
    });
  }
};

export const getMembersProfiles = members => async dispatch => {
  try {
    let profileData = [{}, {}, {}, {}];
    members = members || [];
    members.forEach(async (m, i) => {
      if (!m) {
        profileData[i] = {};
      } else {
        const res = await axios.get("/api/profile/user/" + m);
        profileData[i] = res.data;
      }
    });

    dispatch({
      type: LOAD_MEMBERS,
      payload: profileData
    });
  } catch (err) {
    console.error(err);

    dispatch({
      type: GROUP_ERROR
    });
  }
};
