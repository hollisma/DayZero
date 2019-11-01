import React from "react";
import queryString from "query-string";
import "./auth.css";

const Verification = (props) => {
  let query = queryString.parse(props.location.search);
  return (
      <div>{query['token']}</div>
  );
};
export default Verification;