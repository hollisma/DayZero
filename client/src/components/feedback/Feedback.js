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
    emoji: -1
  });

  const [genFeedback, setGenFeedback] = useState('');

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

    try {
      if (r1.receiver_id) {
        await axios.post("/api/rating", r1, config);
      }
      await axios.put("/api/rating/finish");

      if (genFeedback) {
        await axios.post('api/feedback', { feedback: genFeedback }, config)
      }

      window.location.href = "/dashboard#";
    } catch (err) {
      console.log(err.response);
    }
  };

  const Receivers = membersData.map((m, i) =>
    m.user && m.user.name !== user.name ? (
      <ReceiverFeedback
        name={m.user.name}
        avatar={m.user.avatar}
        setStateCallback={setR1}
        emoji={r1.emoji}
        receiver_id={m.user._id}
        key={i}
      />
    ) : null
  );

  return (
    <div className="feedback">
      <p id="feedback-intro">
        Hey {user.name.split(' ')[0]}, I hope you enjoyed meeting your Day Zeros! To make sure
        you get matched with the people you'd vibe with most, we'd really
        appreciate your anonymous feedback. Your Day Zeros won't know what
        responses you gave.
      </p>
      {Receivers}
      <div className='general-feedback'>
        <p className='general-feedback-text'>
          Any thoughts, complaints, praises, or changes you'd like to see on 
          your experience with DayZero? (this is anonymous!)
        </p>
        <textarea 
          type='text'  
          className='general-feedback-input'
          onChange={e=>setGenFeedback(e.target.value)} 
          value={genFeedback} 
        />
      </div>
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

export default connect(mapStateToProps, {
  getCurrentGroup,
  getMembersProfiles
})(Feedback);
