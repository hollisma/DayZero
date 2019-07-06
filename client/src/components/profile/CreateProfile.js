import React from "react";
import { Link } from "react-router-dom";

const CreateProfile = () => {
  return (
    <div>
      <p>Click here to create your profile and start meeting people!</p>
      <button className="ui button massive">
        <Link to="/edit-profile">Create Profile</Link>
      </button>
    </div>
  );
};

export default CreateProfile;
