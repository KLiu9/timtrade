import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";

import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";

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
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [PopUp, setPopUp] = useState(false);
  const [claimer, setClaimer] = useState([]);
  const [userPopUp, setUserPopUp] = useState(false);
  const [userClicked, setUserClicked] = useState();

  const handleClose = () => setPopUp(false);
  const handleOpen = () => {
    setPopUp(true);
    //console.log("opened first");
  };
  const handleClick = (obj) => () => {
    setUserClicked(obj);
    setUserPopUp(true);
  };
  const handleUserClose = () => {
    setUserPopUp(false);
  };

  useEffect(() => {
    get("/api/listings", { creator: props.userId }).then((itemObjs) => {
      setItems(itemObjs);
    });
    if (props.claimed && props.claimed.length !== 0) {
      get("/api/user", { userid: props.claimed[0] }).then((userObj) => {
        setClaimer(userObj);
      });
      /*for (let ind = 0; ind < props.claimed.length; ind++) {
        get("/api/user", { userid: props.claimed[ind] }).then((userObj) => {
          setClaimers((oldArray) => [...oldArray, userObj]);
        });
      }*/
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
        // console.log("item", item);
      });
    }
  };

  /*let claimerUsernames = [];
  claimerUsernames = claimer.map((x) => (
    <>
      <button
        className="requestmatch-resolve"
        style={{
          backgroundColor: "var(--white)",
          fontWeight: "bold",
          width: "auto",
          margin: "5px",
        }}
        value={x.username}
        //onClick={handleUserOpen}
        onClick={handleClick(x)}
      >
        {"@" + x.username}
      </button>
    </>
  ));*/

  let claimerUsernames;
  if (props.claimed.length !== 0) {
    claimerUsernames = (
      <>
        <button
          className="requestmatch-resolve"
          style={{
            backgroundColor: "var(--white)",
            fontWeight: "bold",
            width: "auto",
            margin: "5px",
          }}
          value={claimer.username}
          //onClick={handleUserOpen}
          onClick={handleClick(claimer)}
        >
          {"@" + claimer.username}
        </button>
      </>
    );
  }

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
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          <br />
          {/*<img className="img-size2" src={beaverimg}></img>*/}
          {!props.claimed || props.claimed.length === 0 ? (
            <>
              <b>waiting to be claimed...</b>
            </>
          ) : (
            <>
              <b>
                claimed by <u>{"@" + claimer.username}</u>!
              </b>
            </>
          )}
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
          {!props.claimed || props.claimed.length === 0 ? (
            <>
              <b>waiting to be claimed...</b>
              <br />
              <br />
              <button
                type="resolve"
                className="requestmatch-resolve"
                value="Resolve"
                onClick={handleDelete}
              >
                delete
              </button>
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
                      style={{
                        backgroundColor: "#E5E5E5",
                      }}
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
              <button
                className="requestmatch-resolve"
                style={{ backgroundColor: "var(--white)", fontWeight: "bold", width: "auto" }}
                onClick={handleOpen}
              >
                {"@" + claimer.username}
              </button>
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
              <br />
              <br />
              <button
                type="resolve"
                className="requestmatch-resolve"
                value="Resolve"
                onClick={handleDelete}
              >
                delete
              </button>
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
                      style={{
                        backgroundColor: "#E5E5E5",
                      }}
                      onClick={handleResolve}
                    >
                      delete
                    </button>
                    <br />
                    <br />
                  </div>
                </div>
              </Modal>
              {/*<Modal className="modal" isOpen={PopUp} ariaHideApp={false}>
                <div
                  style={{
                    backgroundColor: colors[props.index % colors.length],
                    borderRadius: "24px",
                  }}
                >
                  <button className="modal-close" onClick={handleClose}>
                    ✘
                  </button>
                  <div className="modal-content" style={{ fontStyle: "italic" }}>
                    {claimerUsernames}
                    <br />
                    <Modal className="modal" isOpen={userPopUp} ariaHideApp={false}>
                      <div
                        style={{
                          backgroundColor: colors[props.index % colors.length],
                          borderRadius: "24px",
                        }}
                      >
                        <button className="modal-close" onClick={handleUserClose}>
                          ✘
                        </button>
                        <div className="modal-content">
                          {userClicked && (
                            <div>
                              <p className="modal-title">{"@" + userClicked.username}</p>
                              <p>
                                <b>
                                  {" "}
                                  rating:{" "}
                                  {userClicked.ratings.length === 0
                                    ? "no ratings yet!"
                                    : (
                                        userClicked.ratings.reduce((a, b) => a + b, 0) /
                                        userClicked.ratings.length
                                      )
                                        .toFixed(1)
                                        .toString() + "/5.0"}{" "}
                                </b>
                              </p>
                              <p>
                                {" "}
                                name: <i>{userClicked.name}</i>
                              </p>
                              <p>
                                {userClicked.contactMethod1}: <i>{userClicked.contactDetails1}</i>
                              </p>
                              <p>
                                {" "}
                                {userClicked.contactMethod2}: <i>{userClicked.contactDetails2}</i>
                              </p>
                              <p>
                                {" "}
                                location: <i>{userClicked.location}</i>
                              </p>
                              <br />
                            </div>
                          )}
                        </div>
                      </div>
                    </Modal>
                    <br />
                    <br />
                    <button
                      type="resolve"
                      className="requestmatch-resolve"
                      value="Resolve"
                      onClick={handleDelete}
                    >
                      delete
                    </button>
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
                            style={{
                              backgroundColor: "#E5E5E5",
                            }}
                            onClick={handleResolve}
                          >
                            delete
                          </button>
                          <br />
                          <br />
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <br />
                </div>
              </Modal>*/}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FulfillBox(props) {
  const [items, setItems] = useState([]);
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
  };

  const handleFillBoxesClose = () => {
    setFillBoxesPopUp(false);
  };

  useEffect(() => {
    get("/api/user", { userid: props.creator }).then((userObj) => {
      setItemCreator(userObj);
    });
    get("/api/listings", { creator: props.creator }).then((itemObjs) => {
      setItems(itemObjs);
    });
  }, []);

  const handleUnfulfill = (event) => {
    event.preventDefault();
    const body = { reqId: props.reqId, fulfillerId: props.userId };
    post("/api/unclaim", body).then((result) => {
      //console.log("result", result);
    });
  };

  const handleDelete = () => {
    setConfirmationPopUp(true);
  };

  const handleRatingChange = (event) => {
    const prompt = event.target.value;
    setRating(prompt);
  };

  const handleSubmitRating = (event) => {
    //event.preventDefault();
    //console.log("handlesubmitrating");
    if (rating !== "") {
      event.preventDefault();
      const body = { userid: itemCreator._id, newrating: parseInt(rating) };
      post("/api/updateRating", body).then((result) => {
        setRating("");
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
          //console.log("in if statement");
          items.splice(i, 1);
          const body = {
            creator: props.creator,
            name: props.item,
            description: props.description,
            type: props.type,
          };
          post("/api/deleteItem", body).then((item) => {
            //console.log("item", item);
          });
        }
        //handleRatingClose();
        //handleUserClose();
        navigate("/account");
      });
    } else {
      event.preventDefault();
      setFillBoxesPopUp(true);
    }
  };

  //i = (i + 1) % colors.length;
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
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          <b style={{ textDecoration: "underline" }}>
            {!itemCreator ? "" : "@" + itemCreator.username}
          </b>
          <br />
          <br />
          <br />
          <br />
          {props.type}
          <br />
        </div>
        <div className="fulfill-item-box-back">
          {/* back side */}
          <b>item:</b> {props.item} <br />
          <b>description:</b> {props.description} <br />
          <br />
          {/* <b>{props.creator}</b> */}
          <br />
          <button
            className="requestmatch-resolve"
            style={{ backgroundColor: "var(--white)", fontWeight: "bold", width: "auto" }}
            onClick={handleOpen}
          >
            {!itemCreator ? "" : "@" + itemCreator.username}
          </button>
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
          <br />
          <br />
          <button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            onClick={handleRatingOpen}
          >
            resolve
          </button>
          <Modal className="modal" isOpen={ratingPopUp} ariaHideApp={false}>
            <div
              style={{
                backgroundColor: colors[props.index % colors.length],
                borderRadius: "24px",
              }}
            >
              <button className="modal-close" onClick={handleRatingClose}>
                ✘
              </button>
              <div className="modal-content">
                <form>
                  please rate your experience with{" "}
                  {itemCreator && <> {"@" + itemCreator.username} </>}:
                  <select
                    prompt={rating}
                    onChange={handleRatingChange}
                    name="rating"
                    className="createrequest-box"
                    style={{
                      backgroundColor: "var(--grey)",
                      marginRight: "5%",
                      marginTop: "2%",
                    }}
                  >
                    <option value=""></option>
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                  </select>
                  <button
                    type="submit"
                    className="createrequest-submit"
                    value="Submit"
                    style={{
                      backgroundColor: "var(--green)",
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
          <br />
          <button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            onClick={handleDelete}
          >
            unclaim
          </button>
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
                are you sure you want to unclaim this listing?
                <br />
                <br />
                <button
                  type="resolve"
                  className="requestmatch-resolve"
                  value="Resolve"
                  style={{
                    backgroundColor: "#E5E5E5",
                  }}
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
        <div className="requests-container requests-item">log in to access your account!</div>
      </>
    );
  }

  const [user, setUser] = useState();
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      get("/api/listings", { creator: props.userId }).then((itemObjs) => {
        setListings(itemObjs);
      });
    });
    get("/api/allListings", {}).then((listObjs) => {
      setAllListings(listObjs);
      //console.log("listings", allListings);
    });
  }, [listings]);

  if (!user) {
    return <div style={{ paddingLeft: "8%", paddingTop: "8%" }}>loading...</div>;
  }

  let listingsList = null;
  const hasListings = listings.length !== 0;
  if (hasListings) {
    // console.log(listings.length);
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
      />
    ));
  } else {
    listingsList = (
      <div style={{ paddingLeft: "7%", textAlign: "left", fontStyle: "italic" }}>no listings!</div>
    );
  }

  let claimsList = [];
  let claimsList2 = [];
  if (allListings.length !== 0) {
    for (let ind = 0; ind < allListings.length; ind++) {
      if (allListings[ind].claimed.includes(props.userId)) {
        claimsList.push(allListings[ind]);
      }
    }
  }
  if (claimsList.length !== 0) {
    claimsList2 = claimsList.map((listObj, i) => (
      <FulfillBox
        key={`Box_${listObj._id}`}
        item={listObj.name}
        creator={listObj.creator}
        type={listObj.type}
        index={i}
        description={listObj.description}
        reqId={listObj._id}
        userId={props.userId}
      />
    ));
  } else {
    claimsList2 = (
      <div style={{ paddingLeft: "10px", fontStyle: "italic" }}>
        <br />
        you have not claimed any listings!
      </div>
    );
  }

  user.name = user.name.toLowerCase();
  return (
    <div>
      <NavBar />
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
              <input
                placeholder={user.contactDetails1}
                className="accountinfo-box"
                readOnly
              ></input>
            </div>
            <div className="spacing">
              <div className="accountinfo-label">alternative contact:</div>
              <input placeholder={user.contactMethod2} className="accountinfo-box" readOnly></input>
            </div>
            <div className="spacing">
              <div className="accountinfo-label">details:</div>
              <input
                placeholder={user.contactDetails2}
                className="accountinfo-box"
                readOnly
              ></input>
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
          <div className="accountinfo-container" style={{ marginTop: "20px", paddingLeft: "0px" }}>
            <div className="inventory-container">{listingsList}</div>
          </div>
        </div>
        <div style={{ paddingTop: "35%" }}>
          <div className="user-box">
            <div className="user-title">claimed items</div>
          </div>
          <div className="accountinfo-container" style={{ marginTop: "20px", paddingLeft: "0px" }}>
            <div className="inventory-container">{claimsList2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
