import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { getCurrentGroup, getMembersProfiles } from "../../actions/group";
import ReceiverFeedback from "./ReceiverFeedback";

import "./Feedback.css";

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
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    console.log(r1);
    console.log(r2);
    console.log(r3);
    // try {
    //   if (r1.receiver_id) {
    //     await axios.post("/api/feedback", r1, config);
    //   }
    //   if (r2.receiver_id) {
    //     await axios.post("/api/feedback", r2, config);
    //   }
    //   if (r3.receiver_id) {
    //     await axios.post("/api/feedback", r3, config);
    //   }
    //   await axios.put("/api/feedback/finish");
    // } catch (err) {
    //   console.log(err.response);
    // }
  };

  let count = 0;
  const setStates = [setR1, setR2, setR3];
  const Receivers = membersData.map((m, i) =>
    m.user && m.user.name !== user.name ? (
      <ReceiverFeedback
        name={m.user.name}
        setStateCallback={setStates[count++]}
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
