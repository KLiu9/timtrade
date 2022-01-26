import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";

import login from "../../../dist/images/login.png";
import createreqimg from "../../../dist/images/createrequest2.png";
import reqmatchimg from "../../../dist/images/requestmatch4.png";
import reqmatchwords from "../../../dist/images/requestmatchwords.png";
import createreqwords from "../../../dist/images/createrequestwords.png";
import beaverwash from "../../../dist/images/beaverwash2.png";
import washer from '../../../dist/images/washingmachine.png';

import "../../utilities.css";
import "./Requests.css";

const Requests = (props) => {
  if (!props.userId) {
    return (
      <>
        <NavBarLogo />
        <div className="requests-container requests-item">
          <div className="flex-item" style={{ display: "block", textAlign: "center" }}>
            <img className="loginimg-size" src={login} />
            log in to create and view requests!
          </div>
        </div>
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

  if (!fetched) {
    return (
      <>
        <NavBarLogo />
        <div className="loading">
          <div>
            <img className="washingbeaver" src={beaverwash} />
            <img className="washer" src={washer} />
            <center style={{ paddingTop: "5%", paddingLeft: "1%" }}>loading...</center>
          </div>
        </div>
      </>
    );
  }

  if (
    !user ||
    !user.username ||
    !user.kerb ||
    !user.contactMethod1 ||
    !user.contactDetails1 ||
    !user.contactMethod2 ||
    !user.contactDetails2 ||
    !user.location
  ) {
    return (
      <>
        <NavBarLogo />
        <div className="requests-container requests-item">
          enter all account info before requesting items!
        </div>
      </>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="requests-container" style={{ marginTop: "-3%" }}>
        <div className="create-request">
          <Link to="/requests/create/" className="requests-item">
            <img className="req-img-size" src={createreqimg}/>
          </Link>
          <Link to="/requests/create/" className="requests-item">
            <img className="req-words-size flex-item" src={createreqwords} />
          </Link>
        </div>
        <div className="request-match" style={{ marginRight: "3%" }}>
          <Link to="/requests/match/" className="requests-item">
            <img className="req-img-size2" src={reqmatchimg}/>
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
