import React from "react";
import Settings from "./settings/Settings";
import Group from "./group/Group";

const pageBackground = {
  background: "#FAFAFA"
};

const Dashboard = () => {
  return (
    <div className="dashboard" style={pageBackground}>
      <Group />
      <Settings />
    </div>
  );
};

export default Dashboard;
