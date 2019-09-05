import React from "react";

const NotFound = () => {
  return (
    <div style={{ margin: "100px", marginTop: "200px", textAlign: "center" }}>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
    </div>
  );
};

export default NotFound;
