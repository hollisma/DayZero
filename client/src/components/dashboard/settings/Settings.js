import React from "react";
import EditProfile from "./EditProfile";
import Calendar from "./Calendar";

const Settings = () => {
  return (
    <div id="settings">
      <Calendar />
      <EditProfile />
    </div>
  );
};

export default Settings;