import React from "react";
import Settings from "./settings/Settings";
import Group from "./group/Group";
import PropTypes from "prop-types";

const Dashboard = props => {
  return (
    <div>
      <Group />
      <Settings />
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
