import React from "react";
import Settings from "./settings/Settings";
import Group from "./group/Group";
import { generateKeyPair } from "crypto";

const pageBackground = {
  background: "#F6F6F6"
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
