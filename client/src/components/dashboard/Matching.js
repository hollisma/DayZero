import React from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";

const Matching = () => {

  return (
    <div className="matching">
      Click here to get a match!
      <Link to='/dashboard/activities' className="ui basic button m-1">
        Match
      </Link>
    </div>
  );
};

export default Matching;
