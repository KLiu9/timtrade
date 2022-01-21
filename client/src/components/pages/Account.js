import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./CreateRequest.css";
import "./Account.css";
import "./Fulfill.css";
//import beaverimg from "../../../dist/images/beaver icon.png";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let i = 0;

function Box(props) {
  // const [reqCreator, setReqCreator] = useState();

  // useEffect(() => {
  //   get("/api/user", { userid: props.creator }).then((userObj) => {
  //     setReqCreator(userObj);
  //   });
  // }, []);

  const [items, setItems] = useState([]);
  useEffect(() => {
    // document.title = "request matches";
    get("/api/listings", { creator: props.userId }).then((itemObjs) => {
      setItems(itemObjs);
    });
  }, []);

  const handleResolve = (event) => {
    event.preventDefault();

    let done = false;
    let i = 0;
    while (!done && i < items.length) {
      if (
        items[i].name === props.item &&
        items[i].description === props.description &&
        items[i].type === props.type
      ) {
        done = true;
      } else {
        i++;
      }
    }

    if (i < items.length) {
      items.splice(i, 1);
      const body = {
        creator: props.creator,
        name: props.item,
        description: props.description,
        type: props.type,
      };
      post("/api/deleteItem", body).then((item) => {
        console.log("item", item);
      });
    }
  };

  i = (i + 1) % colors.length;
  return (
    <div
      className="fulfill-item-box"
      style={{
        backgroundColor: colors[props.index % colors.length],
        marginRight: "40px",
        marginLeft: "40px",
        marginBottom: "20px",
      }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          {/* front side */}
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          {/*<img className="img-size2" src={beaverimg}></img>*/}
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="fulfill-item-box-back">
          {/* back side */}
          <b>item:</b> {props.item} <br />
          <b>description:</b> {props.description} <br />
          <b>type:</b> {props.type} <br />
          <br />
          <br />
          {/* <button
            className="requestmatch-resolve"
            style={{ backgroundColor: "var(--white)", fontWeight: "bold", width: "auto" }}
            onClick={handleOpen}
          >
            {!reqCreator ? "" : "@" + reqCreator.username}
          </button>
          <br />
          <br /> */}
          <button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            onClick={handleResolve}
          >
            resolve
          </button>
        </div>
      </div>
    </div>
  );
}

const Account = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in to access your account!</div>;
  }

  const [user, setUser] = useState();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      get("/api/listings", { creator: props.userId }).then((itemObjs) => {
        setListings(itemObjs);
      });
    });
  }, [listings]);

  if (!user) {
    return <div>loading...</div>;
  }

  let listingsList = null;
  const hasListings = listings.length !== 0;
  if (hasListings) {
    listingsList = listings.map((itemObj, i) => (
      <Box
        key={`Box_${itemObj._id}`}
        creator={itemObj.creator}
        item={itemObj.name}
        description={itemObj.description}
        type={itemObj.type}
        userId={props.userId}
        index={i}
      />
    ));
  } else {
    listingsList = (
      <div style={{ paddingLeft: "0px", textAlign: "left", fontStyle: "italic" }}>no listings!</div>
    );
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
          <div className="email-title" style={{ textDecoration: "none" }}>
            {" "}
            rating:{" "}
            {user.ratings.length === 0
              ? "no ratings yet!"
              : (user.ratings.reduce((a, b) => a + b, 0) / user.ratings.length)
                  .toFixed(1)
                  .toString() + "/5.0"}{" "}
          </div>
          <button
            type="submit"
            className="edit-profile"
            value="Submit"
            onClick={() => navigate("/account/edit/")}
          >
            edit profile
          </button>
        </div>
        <div className="accountinfo-container">
          <div className="spacing">
            <div className="accountinfo-label">username:</div>
            <input placeholder={user.username} className="accountinfo-box" readOnly></input>
          </div>
          <div className="spacing">
            <div className="accountinfo-label">kerb:</div>
            <input placeholder={user.kerb} className="accountinfo-box" readOnly />
          </div>
          <div className="spacing">
            <div className="accountinfo-label">preferred contact:</div>
            <input placeholder={user.contactMethod1} className="accountinfo-box" readOnly />
          </div>
          <div className="spacing">
            <div className="accountinfo-label">details:</div>
            <input placeholder={user.contactDetails1} className="accountinfo-box" readOnly></input>
          </div>
          <div className="spacing">
            <div className="accountinfo-label">alternative contact:</div>
            <input placeholder={user.contactMethod2} className="accountinfo-box" readOnly></input>
          </div>
          <div className="spacing">
            <div className="accountinfo-label">details:</div>
            <input placeholder={user.contactDetails2} className="accountinfo-box" readOnly></input>
          </div>
          <div className="spacing">
            <div className="accountinfo-label">location:</div>
            <input placeholder={user.location} className="accountinfo-box" readOnly></input>
          </div>
        </div>
      </div>

      {/* INVENTORY SECTION */}
      <div style={{ paddingTop: "25%" }}>
        <div className="user-box">
          <div className="user-title">my inventory</div>
          <button
            type="submit"
            className="edit-profile"
            value="Submit"
            onClick={() => navigate("/account/editinventory/")}
            style={{ width: "140px" }}
          >
            add to inventory
          </button>
        </div>
        <div className="accountinfo-container" style={{ marginTop: "20px", height: "auto" }}>
          <div
            className="fulfill-container"
            style={{ height: "auto", marginTop: "0px", marginBottom: "0px" }}
          >
            {listingsList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
