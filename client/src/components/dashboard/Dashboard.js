import React from "react";
import Settings from "./settings/Settings";
import Group from "./group/Group";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Group />
      <Settings />
    </div>
  );
};

export default Dashboard;
