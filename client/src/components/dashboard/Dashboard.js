import React from "react";
import Settings from "./settings/Settings";
import Group from "./group/Group";
import { generateKeyPair } from "crypto";

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
