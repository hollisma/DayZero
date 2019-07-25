import React from "react";
import EditProfile from "./profile/EditProfile";
import Calendar from "./calendar/Calendar";

const Settings = () => {
  return (
    <div id="settings">
      <Calendar />
      <EditProfile />
    </div>
  );
};

export default Settings;
