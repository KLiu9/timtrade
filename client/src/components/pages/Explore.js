import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Modal from "react-modal";
import { navigate } from "@reach/router";
import login from "../../../dist/images/login.png";

import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";
import SearchBar from "../modules/SearchBar.js";
import ImageDict from "../modules/ImageDict.js";

import "../../utilities.css";
import "./Fulfill.css";

let colors = ["var(--purple)", "var(--green)", "var(--yellow)", "var(--blue)"];
let i = 0;

function Box(props) {
  const [reqCreator, setReqCreator] = useState();
  const [PopUp, setPopUp] = useState(false);
  const [PopUpFulfill, setPopUpFulfill] = useState(false);
  const [PopUpFulfillOwn, setPopUpFulfillOwn] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  const handleCloseFulfill = () => {
    setPopUpFulfill(false);
    const body = { reqId: props.reqId, creatorId: props.userId };
    post("/api/updateListing", body).then((result) => {
      //console.log("result", result);
    });
  };
  useEffect(() => {
    get("/api/user", { userid: props.creator }).then((userObj) => {
      setReqCreator(userObj);
    });
  }, []);
  const handleCloseFulfillOwn = () => setPopUpFulfillOwn(false);

  const handleClaim = (event) => {
    event.preventDefault();
    if (props.userId === reqCreator._id) {
      setPopUpFulfillOwn(true);
    } else {
      setPopUpFulfill(true);
      /*const body = { reqId: props.reqId, creatorId: props.userId };
      post("/api/updateListing", body).then((result) => {
        console.log("result", result);
      });*/
    }
  };

  //console.log("hihi", reqCreator);
  i = (i + 1) % colors.length;
  return (
    <div
      className="fulfill-item-box"
      style={{ backgroundColor: colors[props.index % colors.length] }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          <div style={{ height: "50px" }}>
            <b>item:</b> {props.item}{" "}
          </div>
          <img src={props.image} style={{ width: "auto", height: "150px" }} />
          <div>
            <b style={{ textDecoration: "underline" }}>
              {!reqCreator ? "@..." : "@" + reqCreator.username}
            </b>
            <p>wants to {props.type}</p>
          </div>
        </div>
        <div className="fulfill-item-box-back">
          {/* back side */}
          <div>
            <b>item:</b> {props.item} <br />
            <b>description:</b> {props.description} <br />
          </div>
          <div>
            <button
              className="requestmatch-resolve"
              style={{ backgroundColor: "var(--white)", fontWeight: "bold", marginBottom: "15px" }}
              onClick={handleOpen}
            >
              {!reqCreator ? "" : "@" + reqCreator.username}
            </button>
            <button
              type="resolve"
              className="requestmatch-resolve"
              value="Resolve"
              onClick={handleClaim}
              style={{ marginBottom: "10px" }}
            >
              claim
            </button>
          </div>
          <Modal className="modal" isOpen={PopUp} ariaHideApp={false}>
            <div
              style={{ backgroundColor: colors[props.index % colors.length], borderRadius: "24px" }}
            >
              <button className="modal-close" onClick={handleClose}>
                ✘
              </button>
              <div className="modal-content">
                {reqCreator && (
                  <div>
                    <p className="modal-title" style={{ textDecoration: "underline" }}>
                      {"@" + reqCreator.username}
                    </p>
                    <p>
                      <b>
                        {" "}
                        rating:{" "}
                        {reqCreator.ratings.length === 0
                          ? "no ratings yet!"
                          : (
                              reqCreator.ratings.reduce((a, b) => a + b, 0) /
                              reqCreator.ratings.length
                            )
                              .toFixed(1)
                              .toString() + "/5.0"}{" "}
                      </b>
                    </p>
                    <p>
                      {" "}
                      name: <i>{reqCreator.name}</i>
                    </p>
                    <p>
                      {" "}
                      {reqCreator.contactMethod1}: <i>{reqCreator.contactDetails1}</i>{" "}
                    </p>
                    <p>
                      {" "}
                      {reqCreator.contactMethod2}: <i>{reqCreator.contactDetails2}</i>{" "}
                    </p>
                    <p>
                      {" "}
                      location: <i>{reqCreator.location}</i>{" "}
                    </p>
                    <br />
                  </div>
                )}
              </div>
            </div>
          </Modal>
          <Modal className="modal2" isOpen={PopUpFulfill} ariaHideApp={false}>
            <div
              style={{ backgroundColor: colors[props.index % colors.length], borderRadius: "24px" }}
            >
              <button className="modal-close" onClick={handleCloseFulfill}>
                ✘
              </button>
              <div className="modal-content">
                {reqCreator && (
                  <div>
                    <p className="modal-title">claimed</p>
                    <p>
                      {
                        "thank you for claiming @" +
                          reqCreator.username +
                          "'s listing!" /** add more here? */
                      }
                    </p>
                    <br />
                  </div>
                )}
              </div>
            </div>
          </Modal>
          <Modal className="modal" isOpen={PopUpFulfillOwn} ariaHideApp={false}>
            <div
              style={{ backgroundColor: colors[props.index % colors.length], borderRadius: "24px" }}
            >
              <button className="modal-close" onClick={handleCloseFulfillOwn}>
                ✘
              </button>
              <div className="modal-content">
                <p className="modal-title">oops! </p>
                <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                  you can't claim your own listing! to delete your listing, go to the account page.
                </div>
                <br />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

const Explore = (props) => {
  if (!props.userId) {
    return (
      <>
        <NavBarLogo />
        <div className="requests-container requests-item">
          <div className="flex-item" style={{ display: "block", textAlign: "center" }}>
            <img className="loginimg-size" src={login} />
            to explore items!
          </div>
        </div>
      </>
    );
  }

  const [user, setUser] = useState();
  const [fetched, setFetched] = useState(false);
  const [listings, setListings] = useState([]);
  const [unclaimedListings, setUnclaimedListings] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      setFetched(true);
      get("/api/allListings", {}).then((itemObjs) => {
        setListings(itemObjs);
      });
    });
    get("/api/unclaimedListings", {}).then((itemObjs) => {
      setUnclaimedListings(itemObjs);
    });
  }, [unclaimedListings]);

  if (!fetched) {
    return (
      <>
        <NavBarLogo />
        <div className="loader"></div>
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
          enter all account info before exploring items!
        </div>
      </>
    );
  }

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");

  const filterItems = (items, query) => {
    if (!query) {
      return items;
    }
    return items.filter((item) => {
      //console.log(req);
      //const reqLower = req.name.toLowerCase();
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  let listingsList = null;
  const hasListings = unclaimedListings.length !== 0;
  if (hasListings) {
    const timeOrder = ["hour", "day", "week", "weeks", "month"];
    unclaimedListings.sort(function (a, b) {
      let time1 = timeOrder.findIndex((time) => time === a.time);
      let time2 = timeOrder.findIndex((time) => time === b.time);
      if (time1 < time2) {
        return -1;
      }
      if (time1 > time2) {
        return 1;
      }
      return 0;
    });
    const filteredItems = filterItems(unclaimedListings, query);
    if (filteredItems.length !== 0) {
      listingsList = filteredItems.map((itemObj, i) => (
        <Box
          key={`Box_${itemObj._id}`}
          creator={itemObj.creator}
          item={itemObj.name}
          description={itemObj.description}
          type={itemObj.type}
          index={i}
          reqId={itemObj._id}
          userId={props.userId}
          image={itemObj.name in ImageDict ? ImageDict[itemObj.name] : ImageDict["beaver"]}
        />
      ));
    } else {
      listingsList = (
        <div style={{ paddingLeft: "10px", textAlign: "left", fontStyle: "italic" }}>
          <br />
          no listings!
        </div>
      );
    }
  } else {
    listingsList = (
      <div style={{ paddingLeft: "10px", textAlign: "left", fontStyle: "italic" }}>
        <br />
        no listings!
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ padding: "0px 50px", marginLeft: "1%" }}>
        <p className="requestmatch-title" style={{ marginTop: "-0.1%", marginBottom: "-0.1%" }}>
          explore
        </p>
        <SearchBar action="/explore/" />
        <div className="fulfill-container">{listingsList}</div>
      </div>
    </>
  );
};

export default Explore;
