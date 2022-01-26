import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";

import StarRating from "../modules/StarRating.js";
import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";
import { ImageDict, RandomImageDict } from "../modules/ImageDict.js";
import login from "../../../dist/images/login.png";
import beaverwash from "../../../dist/images/beaverwash2.png";
import washer from '../../../dist/images/washingmachine.png';

import "../../utilities.css";
import "./CreateRequest.css";
import "./Account.css";
import "./Fulfill.css";

let colors = ["var(--purple)", "var(--green)", "var(--yellow)", "var(--blue)"];
let i = 0;

function Box(props) {
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [PopUp, setPopUp] = useState(false);
  const [claimer, setClaimer] = useState([]);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => {
    setPopUp(true);
  };

  useEffect(() => {
    if (props.claimed && props.claimed.length !== 0) {
      get("/api/user", { userid: props.claimed[0] }).then((userObj) => {
        setClaimer(userObj);
      });
    }
  }, []);

  const handleConfPopUpClose = () => {
    setConfirmationPopUp(false);
  };

  const handleDelete = () => {
    setConfirmationPopUp(true);
  };

  const handleResolve = (event) => {
    event.preventDefault();
    const body = {
      creator: props.creator,
      name: props.item,
      description: props.description,
      type: props.type,
    };
    post("/api/deleteItem", body);
  };

  return (
    <div
      className="fulfill-item-box"
      style={{
        backgroundColor: colors[props.index % colors.length],
        marginRight: "40px",
        marginLeft: "40px",
        height: "300px",
      }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          {/* front side */}
          <div style={{ height: "50px" }}>
            <b>item:</b> {props.item} <br />
          </div>
          <img src={props.image} style={{ width: "auto" }} />
          <br />
          <div style={{ marginBottom: "20px" }}>
            {!props.claimed || props.claimed.length === 0 ? (
              <>
                <b>waiting to be claimed...</b>
              </>
            ) : (
              <>
                <b>
                  claimed
                  {!claimer.username ? (
                    "!"
                  ) : (
                    <>
                      {" "}
                      by <u>{"@" + claimer.username}</u>!
                    </>
                  )}
                </b>
              </>
            )}
          </div>
        </div>
        <div className="fulfill-item-box-back">
          {/* back side */}
          <div>
            <b>item:</b> {props.item} <br />
            <b>description:</b> {props.description} <br />
            <b>type:</b> {props.type}
          </div>
          {!props.claimed || props.claimed.length === 0 ? (
            <>
              <div>
                <button
                  type="resolve"
                  className="requestmatch-resolve"
                  value="Resolve"
                  onClick={handleDelete}
                  style={{ marginBottom: "10px" }}
                >
                  delete
                </button>
              </div>
              <Modal className="modal3" isOpen={confirmationPopUp} ariaHideApp={false}>
                <div
                  style={{
                    backgroundColor: colors[props.index % colors.length],
                    borderRadius: "24px",
                  }}
                >
                  <button className="modal-close" onClick={handleConfPopUpClose}>
                    ✘
                  </button>
                  <br />
                  <br />
                  <div className="modal-content">
                    are you sure you want to delete your listing?
                    <br />
                    <br />
                    <button
                      type="resolve"
                      className="requestmatch-resolve"
                      value="Resolve"
                      style={{ backgroundColor: "#E5E5E5" }}
                      onClick={handleResolve}
                    >
                      delete
                    </button>
                    <br />
                    <br />
                  </div>
                </div>
              </Modal>
            </>
          ) : (
            <>
              <div>
                <button
                  className="requestmatch-resolve"
                  style={{
                    backgroundColor: "var(--white)",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                  onClick={handleOpen}
                >
                  {"@" + claimer.username}
                </button>
                <button
                  type="resolve"
                  className="requestmatch-resolve"
                  value="Resolve"
                  onClick={handleDelete}
                  style={{ marginBottom: "10px" }}
                >
                  delete
                </button>
              </div>
              <Modal className="modal" isOpen={PopUp} ariaHideApp={false}>
                <div
                  style={{
                    backgroundColor: colors[props.index % colors.length],
                    borderRadius: "24px",
                  }}
                >
                  <button className="modal-close" onClick={handleClose}>
                    ✘
                  </button>
                  <div className="modal-content">
                    {claimer && (
                      <div>
                        <p className="modal-title">{"@" + claimer.username}</p>
                        <p>
                          <b>
                            {" "}
                            rating:{" "}
                            {claimer.ratings &&
                              (claimer.ratings.length === 0
                                ? "no ratings yet!"
                                : (
                                    claimer.ratings.reduce((a, b) => a + b, 0) /
                                    claimer.ratings.length
                                  )
                                    .toFixed(1)
                                    .toString() + "/5.0")}{" "}
                          </b>
                        </p>
                        <p>
                          {" "}
                          name: <i>{claimer.name}</i>
                        </p>
                        <p>
                          {claimer.contactMethod1}: <i>{claimer.contactDetails1}</i>
                        </p>
                        <p>
                          {" "}
                          {claimer.contactMethod2}: <i>{claimer.contactDetails2}</i>
                        </p>
                        <p>
                          {" "}
                          location: <i>{claimer.location}</i>
                        </p>
                        <br />
                      </div>
                    )}
                  </div>
                </div>
              </Modal>
              <Modal className="modal3" isOpen={confirmationPopUp} ariaHideApp={false}>
                <div
                  style={{
                    backgroundColor: colors[props.index % colors.length],
                    borderRadius: "24px",
                  }}
                >
                  <button className="modal-close" onClick={handleConfPopUpClose}>
                    ✘
                  </button>
                  <br />
                  <br />
                  <div className="modal-content">
                    are you sure you want to delete your listing?
                    <br />
                    <br />
                    <button
                      type="resolve"
                      className="requestmatch-resolve"
                      value="Resolve"
                      style={{ backgroundColor: "#E5E5E5" }}
                      onClick={handleResolve}
                    >
                      delete
                    </button>
                    <br />
                    <br />
                  </div>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FulfillBox(props) {
  const [itemCreator, setItemCreator] = useState();
  const [PopUp, setPopUp] = useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [ratingPopUp, setRatingPopUp] = useState(false);
  const [rating, setRating] = useState("");
  const [fillBoxesPopUp, setFillBoxesPopUp] = useState(false);

  const handleConfPopUpClose = () => {
    setConfirmationPopUp(false);
  };

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  const handleRatingOpen = () => {
    setRatingPopUp(true);
  };
  const handleRatingClose = () => {
    setRatingPopUp(false);
    setRating("");
  };

  const handleFillBoxesClose = () => {
    setFillBoxesPopUp(false);
  };

  useEffect(() => {
    get("/api/user", { userid: props.creator }).then((userObj) => {
      setItemCreator(userObj);
    });
  }, []);

  const handleUnfulfill = (event) => {
    event.preventDefault();
    const body = { reqId: props.reqId, fulfillerId: props.userId };
    post("/api/unclaim", body);
  };

  const handleDelete = () => {
    setConfirmationPopUp(true);
  };

  const handleStarRating = (StarRatingData) => {
    setRating(StarRatingData);
  };

  const handleSubmitRating = (event) => {
    if (rating !== "") {
      event.preventDefault();
      const body = { userid: itemCreator._id, newrating: parseInt(rating) };
      post("/api/updateRating", body).then((result) => {
        setRating("");
        const body = {
          creator: props.creator,
          name: props.item,
          description: props.description,
          type: props.type,
        };
        post("/api/deleteItem", body);
        navigate("/account");
      });
    } else {
      event.preventDefault();
      setFillBoxesPopUp(true);
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
        height: "300px",
      }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          {/* front side */}
          <div style={{ height: "40px" }}>
            <b>item:</b> {props.item}
          </div>
          <img src={props.image} style={{ width: "auto", height: "auto" }} />
          <div>
            <b style={{ textDecoration: "underline" }}>
              {!itemCreator ? "" : "@" + itemCreator.username}
            </b>
            <div>{props.type}</div>
          </div>
        </div>
        <div className="fulfill-item-box-back">
          {/* back side */}
          <div>
            <b>item:</b> {props.item} <br />
            <b>description:</b> {props.description}
          </div>
          <div>
            <button
              className="requestmatch-resolve"
              style={{
                backgroundColor: "var(--white)",
                fontWeight: "bold",
                width: "auto",
                marginBottom: "10px",
              }}
              onClick={handleOpen}
            >
              {!itemCreator ? "" : "@" + itemCreator.username}
            </button>
            <br />
            <button
              type="resolve"
              className="requestmatch-resolve"
              value="Resolve"
              onClick={handleRatingOpen}
              style={{ marginBottom: "10px" }}
            >
              resolve
            </button>
            <button
              type="resolve"
              className="requestmatch-resolve"
              value="Resolve"
              onClick={handleDelete}
              style={{ marginBottom: "10px" }}
            >
              unclaim
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
                {itemCreator && (
                  <div>
                    <p className="modal-title">{"@" + itemCreator.username}</p>
                    <p>
                      <b>
                        {" "}
                        rating:{" "}
                        {itemCreator.ratings.length === 0
                          ? "no ratings yet!"
                          : (
                              itemCreator.ratings.reduce((a, b) => a + b, 0) /
                              itemCreator.ratings.length
                            )
                              .toFixed(1)
                              .toString() + "/5.0"}{" "}
                      </b>
                    </p>
                    <p>
                      {" "}
                      name: <i>{itemCreator.name}</i>
                    </p>
                    <p>
                      {itemCreator.contactMethod1}: <i>{itemCreator.contactDetails1}</i>
                    </p>
                    <p>
                      {" "}
                      {itemCreator.contactMethod2}: <i>{itemCreator.contactDetails2}</i>
                    </p>
                    <p>
                      {" "}
                      location: <i>{itemCreator.location}</i>
                    </p>
                    <br />
                  </div>
                )}
              </div>
              <br />
            </div>
          </Modal>
          <Modal className="modal" isOpen={ratingPopUp} ariaHideApp={false}>
            <div
              style={{ backgroundColor: colors[props.index % colors.length], borderRadius: "24px" }}
            >
              <button className="modal-close" onClick={handleRatingClose}>
                ✘
              </button>
              <div className="modal-content">
                <form>
                  please rate your experience with{" "}
                  {itemCreator && <> {"@" + itemCreator.username} </>}:
                  <StarRating handleStarRating={handleStarRating} />
                  <button
                    type="submit"
                    className="createrequest-submit"
                    value="Submit"
                    style={{
                      backgroundColor: "var(--oldgreen)",
                      marginRight: "5%",
                      marginBottom: "3%",
                    }}
                    onClick={handleSubmitRating}
                  >
                    submit feedback
                  </button>
                  <Modal className="modal" isOpen={fillBoxesPopUp} ariaHideApp={false}>
                    <div
                      style={{
                        backgroundColor: colors[props.index % colors.length],
                        borderRadius: "24px",
                      }}
                    >
                      <button className="modal-close" onClick={handleFillBoxesClose}>
                        ✘
                      </button>
                      <br />
                      <div className="modal-content" style={{ fontWeight: "bold" }}>
                        please submit a rating!
                      </div>
                      <br />
                      <br />
                    </div>
                  </Modal>
                  <br />
                </form>
              </div>
            </div>
          </Modal>
          <Modal className="modal3" isOpen={confirmationPopUp} ariaHideApp={false}>
            <div
              style={{ backgroundColor: colors[props.index % colors.length], borderRadius: "24px" }}
            >
              <button className="modal-close" onClick={handleConfPopUpClose}>
                ✘
              </button>
              <br />
              <br />
              <div className="modal-content">
                are you sure you want to unclaim this listing?
                <br />
                <br />
                <button
                  type="resolve"
                  className="requestmatch-resolve"
                  value="Resolve"
                  style={{ backgroundColor: "#E5E5E5" }}
                  onClick={handleUnfulfill}
                >
                  unclaim
                </button>
                <br />
                <br />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

const Account = (props) => {
  if (!props.userId) {
    return (
      <>
        <NavBarLogo />
        <div className="requests-container requests-item">
          <div className="flex-item" style={{ display: "block", textAlign: "center" }}>
            <img className="loginimg-size" src={login} />
            log in to access your account!
          </div>
        </div>
      </>
    );
  }

  const [user, setUser] = useState();
  const [listings, setListings] = useState([]);
  const [claimedListings, setClaimedListings] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      get("/api/listings", { creator: props.userId }).then((itemObjs) => {
        setListings(itemObjs);
      });
    });
    get("/api/listingsByClaimer", { claimer: props.userId }).then((itemObjs) => {
      setClaimedListings(itemObjs);
    });
  }, [listings]);

  if (!user) {
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

  let listingsList = null;
  const hasListings = listings.length !== 0;
  if (hasListings) {
    listings.sort(function (a, b) {
      let status1 = a.claimed.length ? 1 : 0;
      let status2 = b.claimed.length ? 1 : 0;
      if (status1 > status2) {
        return -1;
      }
      if (status1 < status2) {
        return 1;
      }
      return 0;
    });
    listingsList = listings.map((itemObj, i) => (
      <Box
        key={`Box_${itemObj._id}`}
        creator={itemObj.creator}
        item={itemObj.name}
        description={itemObj.description}
        type={itemObj.type}
        userId={props.userId}
        index={i}
        claimed={itemObj.claimed}
        image={itemObj.name in ImageDict ? ImageDict[itemObj.name] : RandomImageDict[(i % 5) + 1]}
      />
    ));
  } else {
    listingsList = (
      <div style={{ paddingLeft: "7%", textAlign: "left", fontStyle: "italic" }}>no listings!</div>
    );
  }

  let claimsList2 = [];
  if (claimedListings.length !== 0) {
    claimsList2 = claimedListings.map((listObj, i) => (
      <FulfillBox
        key={`Box_${listObj._id}`}
        item={listObj.name}
        creator={listObj.creator}
        type={listObj.type}
        index={i}
        description={listObj.description}
        reqId={listObj._id}
        userId={props.userId}
        image={listObj.name in ImageDict ? ImageDict[listObj.name] : RandomImageDict[(i % 5) + 1]}
      />
    ));
  } else {
    claimsList2 = (
      <div style={{ paddingLeft: "7%", fontStyle: "italic" }}>
        <br />
        no claimed listings!
      </div>
    );
  }

  let ratingPercent;
  if (user.ratings.length !== 0) {
    ratingPercent = 100 - (user.ratings.reduce((a, b) => a + b, 0) / user.ratings.length) * 20;
  }

  user.name = user.name.toLowerCase();
  return (
    <div>
      <NavBar />
      <div style={{ padding: "0px 50px" }}>
        <div>
          <div className="user-box">
            <div className="user-title">
              {!user.username || user.username === "" ? "set your username!" : "@" + user.username}
            </div>
            <div className="email-title">{user.email}</div>
            <div className="email-title" style={{ textDecoration: "none" }}>
              {user.ratings.length === 0 ? (
                "no ratings yet!"
              ) : (
                <div className="containerdiv">
                  <div
                    id="innerdiv1"
                    className="innerdiv1"
                    style={{ width: ratingPercent + "%" }}
                  ></div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="edit-profile"
              value="Submit"
              onClick={() => navigate("/account/edit/")}
              style={{ backgroundColor: "var(--green)", boxShadow: "1px 1px var(--darkgreen)" }}
            >
              edit profile
            </button>
          </div>
          <div className="accountinfo-container">
            <div className="spacing">
              <div className="accountinfo-label">username:</div>
              <input placeholder={user.username} className="accountinfo-box" readOnly />
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
              <div className="accountinfo-label">
                {user.contactMethod1 ? user.contactMethod1 + ":" : "details:"}
              </div>
              <input placeholder={user.contactDetails1} className="accountinfo-box" readOnly />
            </div>
            <div className="spacing">
              <div className="accountinfo-label">alternative contact:</div>
              <input placeholder={user.contactMethod2} className="accountinfo-box" readOnly />
            </div>
            <div className="spacing">
              <div className="accountinfo-label">
                {user.contactMethod2 ? user.contactMethod2 + ":" : "details:"}
              </div>
              <input placeholder={user.contactDetails2} className="accountinfo-box" readOnly />
            </div>
            <div className="spacing">
              <div className="accountinfo-label" style={{ paddingBottom: "3%" }}>
                location:
              </div>
              <input placeholder={user.location} className="accountinfo-box" readOnly />
            </div>
          </div>
        </div>
        {/* INVENTORY SECTION */}
        <div className="myinventory">
          <div>
            <div className="user-box" style={{ float: "left" }}>
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
            <div
              className="accountinfo-container"
              style={{ marginTop: "20px", paddingLeft: "0px", float: "right" }}
            >
              <div className="inventory-container">{listingsList}</div>
            </div>
          </div>
        </div>
        <div className="claimeditems">
          <div className="user-box" style={{ float: "left" }}>
            <div className="user-title">claimed items</div>
          </div>
          <div
            className="accountinfo-container"
            style={{ marginTop: "20px", paddingLeft: "0px", float: "right" }}
          >
            <div className="inventory-container">{claimsList2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
