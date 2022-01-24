import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
import Modal from "react-modal";
import StarRating from "./StarRating.js";

import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";

import "../../utilities.css";
import "./RequestMatch.css";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let j = 0;

const initialFulfillValues = {
  fulfiller: "",
  rating: "",
};

function Box(props) {
  const [requests, setRequests] = useState([]);
  const [PopUp, setPopUp] = useState(false);
  const [fulfillers, setFulfillers] = useState([]);
  const [userPopUp, setUserPopUp] = useState(false);
  const [ratingPopUp, setRatingPopUp] = useState(false);
  const [fulfillValues, setFulfillValues] = useState(initialFulfillValues);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [fillBoxesPopUp, setFillBoxesPopUp] = useState(false);
  const [userClicked, setUserClicked] = useState();
  const [starRating, setStarRating] = useState(0);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => {
    setPopUp(true);
    //console.log("opened first");
  };
  const handleUserClose = () => {
    setUserPopUp(false);
  };

  const handleClick = (obj) => () => {
    setUserClicked(obj);
    setUserPopUp(true);
  };

  const handleRatingOpen = () => {
    setRatingPopUp(true);
  };
  const handleRatingClose = () => {
    setRatingPopUp(false);
    setFulfillValues(initialFulfillValues);
  };

  const handleConfPopUpClose = () => {
    setConfirmationPopUp(false);
  };

  const handleDelete = () => {
    setConfirmationPopUp(true);
  };

  const handleFillBoxesClose = () => {
    setFillBoxesPopUp(false);
  };

  let fulfillerUsernames = [];
  useEffect(() => {
    // document.title = "request matches";
    get("/api/requests", { creator: props.userId }).then((requestObjs) => {
      setRequests(requestObjs);
    });
    if (props.fulfilled && props.fulfilled.length !== 0) {
      for (let ind = 0; ind < props.fulfilled.length; ind++) {
        get("/api/user", { userid: props.fulfilled[ind] }).then((userObj) => {
          setFulfillers((oldArray) => [...oldArray, userObj]);
        });
      }
    }
  }, []);

  const handleActualResolve = (event) => {
    event.preventDefault();
    handleRatingOpen();
  };

  const handleResolve = (event) => {
    //this fn actually handles delete, not resolve
    event.preventDefault();

    let done = false;
    let i = 0;
    while (!done && i < requests.length) {
      if (
        requests[i].name === props.item &&
        requests[i].description === props.description &&
        requests[i].type === props.type
      ) {
        done = true;
      } else {
        i++;
      }
    }

    if (i < requests.length) {
      requests.splice(i, 1);
      const body = {
        creator: props.creator,
        name: props.item,
        description: props.description,
        time: props.time,
        type: props.type,
      };
      post("/api/deleterequest", body).then((request) => {
        // console.log("request", request);
      });
    }
  };

  const handleSubmitRating = (event) => {
    //event.preventDefault();
    if (fulfillValues.fulfiller !== "" && fulfillValues.rating !== "") {
      event.preventDefault();
      const body = { userid: fulfillValues.fulfiller, newrating: parseInt(fulfillValues.rating) };
      post("/api/updateRating", body).then((result) => {
        setFulfillValues(initialFulfillValues);
        let done = false;
        let i = 0;
        while (!done && i < requests.length) {
          if (
            requests[i].name === props.item &&
            requests[i].description === props.description &&
            requests[i].type === props.type
          ) {
            done = true;
          } else {
            i++;
          }
        }

        if (i < requests.length) {
          requests.splice(i, 1);
          const body = {
            creator: props.creator,
            name: props.item,
            description: props.description,
            time: props.time,
            type: props.type,
          };
          post("/api/deleterequest", body).then((request) => {
            //console.log("request", request);
          });
        }
        //handleRatingClose();
        //handleUserClose();
        navigate("/requests/match");
      });
    } else {
      event.preventDefault();
      setFillBoxesPopUp(true);
    }
  };

  const handleFulfillerChange = (event) => {
    const prompt = event.target.value;
    setFulfillValues({ ...fulfillValues, fulfiller: prompt });
    //setFulfiller(prompt);
    //console.log("values", fulfillValues);
  };

  const handleRatingChange = (event) => {
    const prompt = event.target.value;
    setFulfillValues({ ...fulfillValues, rating: prompt });
    //console.log("values", fulfillValues);
  };

  const handleStarRating = (StarRatingData) => {
    //const prompt = event.target.value;
    setStarRating(StarRatingData);
    //console.log("hi", starRating);
    setFulfillValues({ ...fulfillValues, rating: StarRatingData });
    console.log("values", fulfillValues);
  };

  fulfillerUsernames = fulfillers.map((x) => (
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
  ));
  //console.log(fulfillerUsernames);
  j = (j + 1) % colors.length;

  let number = "1";
  if (props.time === "weeks") {
    number = "2";
  }
  let tradeInfo = props.type + " within " + number + " " + props.time;
  return (
    <div
      className="fulfill-item-box"
      style={{ backgroundColor: colors[props.index % colors.length] }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          {!props.fulfilled || props.fulfilled.length === 0 ? (
            <>
              <b>waiting to be fulfilled...</b>
            </>
          ) : (
            <>
              <b>your request has been fulfilled!</b>
            </>
          )}
          <br />
          <br />
          <br />
          {tradeInfo}
        </div>
        <div className="fulfill-item-box-back">
          <b>item:</b> {props.item} <br />
          <b>description:</b> {props.description} <br />
          <br />
          <br />
          {!props.fulfilled || props.fulfilled.length === 0 ? (
            <>
              <b>waiting to be fulfilled...</b>
              <br />
              <br />
              <br />
              <button
                type="resolve"
                className="requestmatch-resolve"
                value="Resolve"
                style={{
                  backgroundColor: "#E5E5E5",
                }}
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
                    are you sure you want to delete your request?
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
                see who has your item
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
                  <div className="modal-content" style={{ fontStyle: "italic" }}>
                    {fulfillerUsernames}
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
                      style={{
                        backgroundColor: "#E5E5E5",
                      }}
                      onClick={handleActualResolve}
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
                            who fulfilled your request?{" "}
                            <select
                              prompt={fulfillValues.fulfiller}
                              onChange={handleFulfillerChange}
                              name="fulfiller"
                              className="createrequest-box"
                              style={{
                                backgroundColor: "var(--grey)",
                                marginRight: "5%",
                                marginTop: "2%",
                                marginBottom: "3%",
                              }}
                            >
                              <option key={""} value={""}></option>
                              {fulfillers.map((x) => (
                                <option key={x.username} value={x._id}>
                                  {x.username}
                                </option>
                              ))}
                            </select>
                            please rate your experience with this user:
                            {/*<select
                              prompt={fulfillValues.rating}
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
                            </select>*/}
                            <StarRating handleStarRating={handleStarRating} />
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
                                  please complete all fields!
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
                      style={{
                        backgroundColor: "#E5E5E5",
                      }}
                      onClick={handleDelete}
                    >
                      delete
                    </button>
                    <Modal
                      className="modal"
                      isOpen={confirmationPopUp}
                      ariaHideApp={false}
                      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                    >
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
                          are you sure you want to delete your request?
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
  const [reqCreator, setReqCreator] = useState();
  const [PopUp, setPopUp] = useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const handleConfPopUpClose = () => {
    setConfirmationPopUp(false);
  };

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  useEffect(() => {
    get("/api/user", { userid: props.creator }).then((userObj) => {
      setReqCreator(userObj);
    });
  }, []);

  const handleUnfulfill = (event) => {
    event.preventDefault();
    const body = { reqId: props.reqId, fulfillerId: props.userId };
    post("/api/unfulfill", body).then((result) => {
      //console.log("result", result);
    });
  };

  const handleDelete = () => {
    setConfirmationPopUp(true);
  };

  //i = (i + 1) % colors.length;
  let number = "1";
  if (props.time === "weeks") {
    number = "2";
  }
  let tradeInfo = props.type + " within " + number + " " + props.time;
  return (
    <div
      className="fulfill-item-box"
      style={{ backgroundColor: colors[props.index % colors.length] }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          {/* front side */}
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          <b style={{ textDecoration: "underline" }}>
            {!reqCreator ? "" : "@" + reqCreator.username}
          </b>
          <br />
          <br />
          <br />
          {tradeInfo}
          <br />
        </div>
        <div className="fulfill-item-box-back">
          {/* back side */}
          <b>item:</b> {props.item} <br />
          <b>description:</b> {props.description} <br />
          <br />
          {/* <b>{props.creator}</b> */}
          <br />
          <br />
          <button
            className="requestmatch-resolve"
            style={{ backgroundColor: "var(--white)", fontWeight: "bold", width: "auto" }}
            onClick={handleOpen}
          >
            {!reqCreator ? "" : "@" + reqCreator.username}
          </button>
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
                    <p className="modal-title">{"@" + reqCreator.username}</p>
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
                      {reqCreator.contactMethod1}: <i>{reqCreator.contactDetails1}</i>
                    </p>
                    <p>
                      {" "}
                      {reqCreator.contactMethod2}: <i>{reqCreator.contactDetails2}</i>
                    </p>
                    <p>
                      {" "}
                      location: <i>{reqCreator.location}</i>
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
            onClick={handleDelete}
          >
            unfulfill
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
                are you sure you want to unfulfill this request?
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
                  unfulfill
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

const RequestMatch = (props) => {
  if (!props.userId) {
    return (
      <>
        <NavBarLogo />
        <div className="requests-container requests-item">log in to view your request matches!</div>
      </>
    );
  }

  const [user, setUser] = useState();
  const [allUserInfo, setAllUserInfo] = useState(true);
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      get("/api/requests", { creator: props.userId }).then((requestObjs) => {
        setRequests(requestObjs);
      });
      get("/api/allrequests", {}).then((requestObjs) => {
        setAllRequests(requestObjs);
      });
    });
    // FIGURE OUT WHY THIS DOESNT WORK WHEN [] IS NOT THE SECOND PARAMETER OF USEEFFECT
    // setAllUserInfo(!user || !user.username || !user.kerb || !user.contactMethod1 || !user.contactDetails1 ||
    //   !user.contactMethod2 || !user.contactDetails2 || !user.location);
  }, [props.userId, requests]);

  let requestsList = null;
  const hasRequests = requests.length !== 0;
  if (hasRequests) {
    requests.sort(function (a, b) {
      let status1 = a.fulfilled.length ? 1 : 0;
      let status2 = b.fulfilled.length ? 1 : 0;
      if (status1 > status2) {
        return -1;
      }
      if (status1 < status2) {
        return 1;
      }
      return 0;
    });
    requestsList = requests.map((requestObj, i) => (
      <Box
        key={`Box_${requestObj._id}`}
        creator={requestObj.creator}
        item={requestObj.name}
        description={requestObj.description}
        type={requestObj.type}
        time={requestObj.time}
        userId={props.userId}
        index={i}
        fulfilled={requestObj.fulfilled}
      />
    ));
  } else {
    requestsList = (
      <div style={{ paddingLeft: "10px", fontStyle: "italic" }}>
        <br />
        no requests!
      </div>
    );
  }
  let fulfillsList = [];
  let fulfillsList2 = [];
  if (allRequests.length !== 0) {
    for (let ind = 0; ind < allRequests.length; ind++) {
      if (allRequests[ind].fulfilled.includes(props.userId)) {
        fulfillsList.push(allRequests[ind]);
      }
    }
  }
  if (fulfillsList.length !== 0) {
    fulfillsList2 = fulfillsList.map((requestObj, i) => (
      <FulfillBox
        key={`Box_${requestObj._id}`}
        item={requestObj.name}
        creator={requestObj.creator}
        time={requestObj.time}
        type={requestObj.type}
        index={i}
        description={requestObj.description}
        reqId={requestObj._id}
        userId={props.userId}
      />
    ));
  } else {
    fulfillsList2 = (
      <div style={{ paddingLeft: "10px", fontStyle: "italic" }}>
        <br />
        you have not fulfilled any requests!
      </div>
    );
  }

  return allUserInfo ? (
    <>
      <NavBar />
      <div style={{ padding: "0px 50px" }}>
        <p className="requestmatch-title" style={{ marginTop: "-0.1%", marginBottom: "-0.1%" }}>
          request matches
        </p>
        <div></div>
        <br />
        <br></br>
        <p className="requestmatch-subtitle2">items you requested</p>
        <div className="requestmatch-container">{requestsList}</div>
        <p className="requestmatch-subtitle">items you fulfilled</p>
        <div className="requestmatch-container">{fulfillsList2}</div>
      </div>
    </>
  ) : (
    <div className="requests-container requests-item">
      enter all account info before viewing matches!
    </div>
  );
};

export default RequestMatch;
