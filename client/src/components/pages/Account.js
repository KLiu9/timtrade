import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./CreateRequest.css";
import "./Account.css";

const Account = (props) => {
    return (
        // MOVE LOGOUT BUTTON TO THIS PAGE (instead of navbar)
        <div style={{padding:"0px 50px"}}>
            <div>
                {/* <a className="user-title">{props.username}</a> */}
                <a className="user-box">
                    <div className="user-title">@bobaconnoisseur</div>
                    <div className="email-title">katieliu@mit.edu</div>
                    <button
                        type="submit"
                        className="edit-profile"
                        value="Submit"
                        style={{backgroundColor: "var(--purple)"}}
                        // onClick={handleSubmit}
                    >
                        edit profile
                    </button>
                </a>
            </div>
            <br />
            <div className="accountinfo-container">
            <p className="spacing">
                <a className="accountinfo-label">name:</a>
                <input
                    placeholder="batie biu"
                    // placeholder={props.name}
                    className="accountinfo-box"
                    readOnly
                >
                </input>
            </p>
            <p className="spacing">
                <a className="accountinfo-label">kerb:</a>
                <input
                    placeholder="katieliu"
                    // placeholder={props.kerb}
                    className="accountinfo-box"
                    readOnly
                />
            </p>
            <p className="spacing">
                <a className="accountinfo-label">preferred contact:</a>
                <input
                    placeholder="text message"
                    // placeholder={props.contact1}
                    className="accountinfo-box"
                    readOnly
                />
            </p>
            <p className="spacing">
                <a className="accountinfo-label">alternative contact:</a>
                <input
                    placeholder="messenger"
                    // placeholder={props.contact2}
                    className="accountinfo-box"
                    readOnly
                >
                </input>
            </p>
            <p className="spacing">
                <a className="accountinfo-label">contact details:</a>
                <input
                    placeholder="phone #: 555-555-5555, messenger: @bobaconnoisseur"
                    // placeholder={props.contactDetails}
                    className="accountinfo-box"
                    readOnly
                >
                </input>
            </p>
            <p className="spacing">
                <a className="accountinfo-label">location:</a>
                <input
                    placeholder="new vassar"
                    // placeholder={props.location}
                    className="accountinfo-box"
                    readOnly
                >
                </input>
            </p>
            </div>
        </div>
    );
};

export default Account;