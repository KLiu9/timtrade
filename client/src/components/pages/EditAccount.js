import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Account.css";
import "./EditAccount.css";

const EditAccount = (props) => {
  let id = props.userId;

  return (
    <div className="editaccount-container" style={{ padding: "0px 50px" }}>
      <div>
        <div className="user-box">
          <div className="user-title">@bobaconnoisseur</div>
          <div className="email-title">katieliu@mit.edu</div>
          <button
            type="submit"
            className="edit-profile"
            value="Submit"
            style={{ backgroundColor: "var(--green)" }}
            // onClick={handleSubmit}
          >
            <Link to={"/account/" + id} className="edit-link" userId={props.userId}>
              done
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
            className="editprofile-box"
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">kerb:</div>
          <input
            placeholder="katieliu"
            // placeholder={props.kerb}
            className="editprofile-box"
          />
        </div>
        <div className="spacing">
          <div className="accountinfo-label">preferred contact:</div>
          <input
            placeholder="text message"
            // placeholder={props.contact1}
            className="editprofile-box"
          />
        </div>
        <div className="spacing">
          <div className="accountinfo-label">alternative contact:</div>
          <input
            placeholder="messenger"
            // placeholder={props.contact2}
            className="editprofile-box"
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">contact details:</div>
          <input
            placeholder="phone #: 555-555-5555, messenger: @bobaconnoisseur"
            // placeholder={props.contactDetails}
            className="editprofile-box"
          ></input>
        </div>
        <div className="spacing">
          <div className="accountinfo-label">location:</div>
          <input
            placeholder="new vassar"
            // placeholder={props.location}
            className="editprofile-box"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
