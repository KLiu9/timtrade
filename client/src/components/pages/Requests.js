import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import createreqimg from "../../../dist/images/createrequest.png";
import reqmatchimg from "../../../dist/images/requestmatch.png";

import "../../utilities.css";
import "./Requests.css";

const Requests = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in to request items or view matches!</div>;
  }

  return (
    <div className="requests-container">
      <div className="create-request">
        <Link to="/requests/create/" className="requests-item">
          <img className="req-img-size" src={createreqimg} />
        </Link>
        <br />
        <Link to="/requests/create/" className="requests-item">
          create a request
        </Link>
      </div>
      <div className="request-match">
        <Link to="/requests/match/" className="requests-item">
          <img className="req-img-size2" src={reqmatchimg} />
        </Link>
        <br />
        <Link to="/requests/match/" className="requests-item">
          request matches
        </Link>
      </div>
    </div>
  );
};

export default Requests;
