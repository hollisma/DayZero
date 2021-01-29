import React from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";

const Matching = () => {

  return (
    <div className="matching">
      <Link to='/dashboard/activities' className="ui primary big button m-1 match-button">
        Match
      </Link>
    </div>
  );
};

export default Matching;
