import React, { useState, useEffect } from "react";
import CreateRequest from "./CreateRequest.js";
import RequestMatch from "./RequestMatch.js";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Requests.css";

const Requests = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in before using the requests page!</div>;
  }

  return (
    <div className="requests-container">
      <Link to="/requests/createrequest/" className="requests-item">
        create a request
      </Link>
      <Link to="/requests/requestmatch/" className="requests-item">
        request matches
      </Link>
    </div>
  );
};

export default Requests;
