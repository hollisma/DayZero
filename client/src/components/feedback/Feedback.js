import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { getCurrentGroup, getMembersProfiles } from "../../actions/group";
import ReceiverFeedback from "./ReceiverFeedback";
import { loadUser } from "../../actions/auth";

import "./Feedback.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Feedback = ({
  group: { members, membersData, loading, membersLoading },
  auth: { user },
  getCurrentGroup,
  getMembersProfiles
}) => {
  const [r1, setR1] = useState({
    receiver_id: null,
    rating: null,
    binary: null
  });
  const [r2, setR2] = useState({
    receiver_id: null,
    rating: null,
    binary: null
  });
  const [r3, setR3] = useState({
    receiver_id: null,
    rating: null,
    binary: null
  });

  if (loading) {
    getCurrentGroup();
  }

  if (!loading && membersLoading) {
    getMembersProfiles(members);
  }

  const onSubmit = async () => {
    // Check if any properties are null
    let passed = true;
    propertyCheck: for (let s of states) {
      if (s.receiver_id) {
        for (let p of Object.keys(s)) {
          if (s[p] == null) {
            MySwal.fire({
              title: "Please fill out all areas",
              type: "error"
            });
            passed = false;
            break propertyCheck;
          }
        }
      }
    }

    if (passed) {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      try {
        if (r1.receiver_id) {
          await axios.post("/api/feedback", r1, config);
        }
        if (r2.receiver_id) {
          await axios.post("/api/feedback", r2, config);
        }
        if (r3.receiver_id) {
          await axios.post("/api/feedback", r3, config);
        }
        await axios.put("/api/feedback/finish");

        window.location.href = "/dashboard";
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  let count = 0;
  const states = [r1, r2, r3];
  const setStates = [setR1, setR2, setR3];
  const Receivers = membersData.map((m, i) =>
    m.user && m.user.name !== user.name ? (
      <ReceiverFeedback
        name={m.user.name}
        setStateCallback={setStates[count]}
        rating={states[count].rating}
        binary={states[count++].binary}
        receiver_id={m.user._id}
        key={i}
      />
    ) : null
  );

  return (
    <div className="feedback">
      {Receivers}
      <button onClick={() => onSubmit()} className="ui green basic button">
        Submit
      </button>
    </div>
  );
};

Feedback.propTypes = {
  getCurrentGroup: PropTypes.func.isRequired,
  getMembersProfiles: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentGroup, getMembersProfiles }
)(Feedback);
