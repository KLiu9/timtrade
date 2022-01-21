import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get } from "../../utilities";

import "../../utilities.css";
import "./CreateRequest.css";
import "./Account.css";

const Account = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in to access your account!</div>;
  }

  const [user, setUser] = useState();

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);
  if (!user) {
    return <div>loading...</div>;
  }

  user.name = user.name.toLowerCase();
  return (
    // MOVE LOGOUT BUTTON TO THIS PAGE (instead of navbar)
    <div style={{ padding: "0px 50px" }}>
      <div>
        <div className="user-box">
          <div className="user-title">
            {!user.username || user.username === ""
              ? "set your username!" /** change this lol */
              : "@" + user.username}
          </div>
          <div className="email-title">{user.email}</div>
          <button
            type="submit"
            className="edit-profile"
            value="Submit"
            onClick={() => navigate("/account/edit/")}
          >
            edit profile
          </button>
        </div>
      </div>
      <br />
      <div className="accountinfo-container">
        <div className="spacing">
          <div className="accountinfo-label">username:</div>
          <input placeholder={user.username != "" ? user.username : "bobaconnoisseur"} 
          className="accountinfo-box" 
          readOnly>

          </input>
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
          <div className="accountinfo-label">preferred contact:</div>
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
