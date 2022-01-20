import React from "react";
import { Link } from "@reach/router";
import createreqimg from "../../../dist/images/createrequest.png";
import reqmatchimg from "../../../dist/images/requestmatch2.png";

import "../../utilities.css";
import "./Requests.css";
import reqmatchwords from "../../../dist/images/requestmatchwords.png";
import createreqwords from "../../../dist/images/createrequestwords.png";

const Requests = (props) => {
  if (!props.userId) {
    return (
      <div className="requests-container requests-item">
        log in to request items or view matches!
      </div>
    );
  }

  return (
    <div className="requests-container">
      <div className="create-request">
        <Link to="/requests/create/" className="requests-item">
          <img className="req-img-size" src={createreqimg} />
        </Link>
        <Link to="/requests/create/" className="requests-item">
          <img className="req-words-size flex-item" src={createreqwords} />
        </Link>
      </div>
      <div className="request-match">
        <Link to="/requests/match/" className="requests-item">
          <img className="req-img-size2" src={reqmatchimg} />
        </Link>
        <Link to="/requests/match/" className="requests-item">
          <img className="req-words-size2 flex-item" src={reqmatchwords} />
        </Link>
      </div>
    </div>
  );
};

export default Requests;
