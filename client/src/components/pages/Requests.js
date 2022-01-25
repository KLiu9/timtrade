import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";
import createreqimg from "../../../dist/images/createrequest2.png";
import reqmatchimg from "../../../dist/images/requestmatch3.png";
import reqmatchwords from "../../../dist/images/requestmatchwords.png";
import createreqwords from "../../../dist/images/createrequestwords.png";

import "../../utilities.css";
import "./Requests.css";

const Requests = (props) => {
  if (!props.userId) {
    return (
      <>
        <NavBarLogo />
        <div className="requests-container requests-item">log in to create and view requests!</div>
      </>
    );
  }

  const [user, setUser] = useState();
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      setFetched(true);
    });
  }, []);

  if ( !fetched ) {
    return (
      <>
        <NavBarLogo/>
        <div className="loader"></div>
      </>
    );
  }

  if (!user || !user.username ||
    !user.kerb ||
    !user.contactMethod1 ||
    !user.contactDetails1 ||
    !user.contactMethod2 ||
    !user.contactDetails2 ||
    !user.location) {
      return (
        <>
          <NavBarLogo/>
          <div className="requests-container requests-item">
            enter all account info before requesting items!
          </div>
        </>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="requests-container" style={{ marginTop: "-3%" }}>
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
    </div>
  );
};

export default Requests;
