import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./CreateRequest.css";
import "./Account.css";

const Account = () => {
    return (
        // MOVE LOGOUT BUTTON TO THIS PAGE (instead of navbar)
        <div style={{padding:"0px 50px"}}>
            <p className="user-title">@bobaconnoisseur</p>
            <br />
            <div className="accountinfo-container">
            <p>
                <a className="request-label">name:</a>
                <input
                    placeholder="batie biu"
                    className="accountinfo-box"
                    style={{backgroundColor: "var(--purple)"}}
                    readOnly
                >
                </input>
            </p>
            <p>
                <a className="request-label">kerb:</a>
                <input
                    placeholder="katieliu"
                    className="accountinfo-box"
                    readOnly
                />
            </p>
            <p>
                <a className="request-label">preferred contact:</a>
                <input
                    placeholder="text message"
                    className="accountinfo-box"
                    readOnly
                />
            </p>
            <p>
                <a className="request-label">alternative contact:</a>
                <input
                    placeholder="messenger"
                    className="accountinfo-box"
                    style={{backgroundColor: "var(--blue)"}}
                    readOnly
                >
                </input>
            </p>
            <p>
                <a className="request-label">contact details:</a>
                <input
                    placeholder="phone #: 555-555-5555, messenger: @bobaconnoisseur"
                    className="accountinfo-box"
                    style={{backgroundColor: "var(--blue)"}}
                    readOnly
                >
                </input>
            </p>
            <p>
                <a className="request-label">location:</a>
                <input
                    placeholder="new vassar"
                    className="accountinfo-box"
                    style={{backgroundColor: "var(--yellow)"}}
                    readOnly
                >
                </input>
            </p>
            </div>
        </div>
    );
};

export default Account;