import React from "react";
import Settings from "./settings/Settings";
import Group from "./group/Group";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Group />
      <Settings />
    </div>
  );
};

export default Dashboard;
