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
  console.log(user);
  user.name = user.name.toLowerCase();
  return (
    // MOVE LOGOUT BUTTON TO THIS PAGE (instead of navbar)
    <div style={{ padding: "0px 50px" }}>
      <div>
        {/* <a className="user-title">{props.username}</a> */}
        <div className="user-box">
          <div className="user-title">{user.name}</div> {/* eventually replace w/ username */}
          <div className="email-title">{user.email}</div>
          <button
            type="submit"
            className="edit-profile"
            value="Submit"
            style={{ backgroundColor: "var(--purple)" }}
            // onClick={handleSubmit}
          >
            <Link to={"/account/edit/" + id} className="edit-link" userId={props.userId}>
              edit profile
            </Link>
          </button>
        </div>
      </div>
      <br />
      <div className="accountinfo-container">
        <div className="spacing">
          <div className="accountinfo-label">name:</div>
          <input placeholder={user.name} className="accountinfo-box" readOnly></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">kerb:</div>
          <input
            placeholder={user.kerb !== "" ? user.kerb : "beavertim"}
            className="accountinfo-box"
            readOnly
          />
        </div>
        <div className="spacing">
          <div className="accountinfo-label">preferred contact method:</div>
          <input
            placeholder={user.contactMethod1 !== "" ? user.contactMethod1 : "phone"}
            className="accountinfo-box"
            readOnly
          />
        </div>
        <div className="spacing">
          <div className="accountinfo-label">details:</div>
          <input
            placeholder={user.contactDetails1 !== "" ? user.contactDetails1 : "555-555-5555"}
            className="accountinfo-box"
            readOnly
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">alternative contact:</div>
          <input
            placeholder={user.contactMethod2 !== "" ? user.contactMethod2 : "instagram"}
            className="accountinfo-box"
            readOnly
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">details:</div>
          <input
            placeholder={user.contactDetails2 !== "" ? user.contactDetails2 : "@timbeaver"}
            className="accountinfo-box"
            readOnly
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">location:</div>
          <input
            placeholder={user.location !== "" ? user.location : "new vassar"}
            className="accountinfo-box"
            readOnly
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Account;
