import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

import "../../utilities.css";
import "./CreateRequest.css";
import "./Account.css";

const Account = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);
  if (!user) {
    return <div>loading...</div>;
  }
  let id = user._id;
  return (
    // MOVE LOGOUT BUTTON TO THIS PAGE (instead of navbar)
    <div style={{ padding: "0px 50px" }}>
      <div>
        {/* <a className="user-title">{props.username}</a> */}
        <div className="user-box">
          <div className="user-title">{user.name}</div> {/* eventually replace w/ username */}
          <div className="email-title">
            katieliu@mit.edu {user.email}
            {/* not working */}
          </div>
          <button
            type="submit"
            className="edit-profile"
            value="Submit"
            style={{ backgroundColor: "var(--purple)" }}
            // onClick={handleSubmit}
          >
            <Link to={"/account/edit/" + id} className="edit-link">
              edit profile
            </Link>
          </button>
        </div>
      </div>
      <br />
      <div className="accountinfo-container">
        <div className="spacing">
          <div className="accountinfo-label">name:</div>
          <input
            placeholder="batie biu"
            // placeholder={props.name}
            className="accountinfo-box"
            readOnly
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">kerb:</div>
          <input
            placeholder="katieliu"
            // placeholder={props.kerb}
            className="accountinfo-box"
            readOnly
          />
        </div>
        <div className="spacing">
          <div className="accountinfo-label">preferred contact:</div>
          <input
            placeholder="text message"
            // placeholder={props.contact1}
            className="accountinfo-box"
            readOnly
          />
        </div>
        <div className="spacing">
          <div className="accountinfo-label">alternative contact:</div>
          <input
            placeholder="messenger"
            // placeholder={props.contact2}
            className="accountinfo-box"
            readOnly
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">contact details:</div>
          <input
            placeholder="phone #: 555-555-5555, messenger: @bobaconnoisseur"
            // placeholder={props.contactDetails}
            className="accountinfo-box"
            readOnly
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">location:</div>
          <input
            placeholder="new vassar"
            // placeholder={props.location}
            className="accountinfo-box"
            readOnly
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Account;
