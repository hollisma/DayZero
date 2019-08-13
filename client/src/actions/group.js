import axios from "axios";
import { GET_GROUP, GROUP_ERROR } from "./types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// Return an array of IDs of the group members
export const getCurrentGroup = () => async dispatch => {
  try {
    const res = await axios.get("/api/groups");

    dispatch({
      type: GET_GROUP,
      payload: res.data
    });
  } catch (err) {
    if (err.response.status === 400) {
      MySwal.fire({ title: err.response.statusText, type: "error" });
    }

    dispatch({
      type: GROUP_ERROR
    });
  }
};
