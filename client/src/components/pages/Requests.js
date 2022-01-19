import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Requests.css";

const Requests = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in to request items or view matches!</div>;
  }

  return (
    <div className="requests-container">
      <Link to="/requests/create/" className="requests-item">
        create a request
      </Link>
      <Link to="/requests/match/" className="requests-item">
        request matches
      </Link>
    </div>
  );
};

export default Requests;
