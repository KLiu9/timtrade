import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Modal from "react-modal";

import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";
import SearchBar from "../modules/SearchBar.js";
import ImageDict from "../modules/ImageDict.js";
import login from "../../../dist/images/login.png";

import "../../utilities.css";
import "./Fulfill.css";

let colors = ["var(--purple)", "var(--green)", "var(--yellow)", "var(--blue)"];
let i = 0;

function Box(props) {
  const [reqCreator, setReqCreator] = useState();
  const [PopUp, setPopUp] = useState(false);
  const [PopUpFulfill, setPopUpFulfill] = useState(false);
  const [PopUpFulfillOwn, setPopUpFulfillOwn] = useState(false);
  const [thisRequest, setThisRequest] = useState();
  const [PopUpAlrFulfilled, setPopUpAlrFulfilled] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  const handleCloseFulfill = () => setPopUpFulfill(false);
  useEffect(() => {
    get("/api/user", { userid: props.creator }).then((userObj) => {
      setReqCreator(userObj);
    });
    get("/api/thisrequest", { reqId: props.reqId }).then((reqObj) => {
      setThisRequest(reqObj);
    });
  }, [thisRequest]);
  const handleCloseFulfillOwn = () => setPopUpFulfillOwn(false);
  const handleCloseAlrFulfilled = () => setPopUpAlrFulfilled(false);

  const handleFulfill = (event) => {
    event.preventDefault();
    if (props.userId === reqCreator._id) {
      setPopUpFulfillOwn(true);
    } else if (thisRequest.fulfilled.includes(props.userId)) {
      setPopUpAlrFulfilled(true);
    } else {
      setPopUpFulfill(true);
      const body = { reqId: props.reqId, creatorId: props.userId };
      post("/api/updateRequest", body);
    }
  };

  i = (i + 1) % colors.length;
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
          <div style={{ height: "50px" }}>
            <b>item:</b> {props.item}
          </div>
          <img src={props.image} style={{ width: "auto", height: "150px" }} />
          <b style={{ textDecoration: "underline" }}>
            {!reqCreator ? "@..." : "@" + reqCreator.username}
          </b>
          <div>wants to {tradeInfo}</div>
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
              style={{ backgroundColor: "var(--white)", fontWeight: "bold", marginBottom: "15px" }}
              onClick={handleOpen}
            >
              {!reqCreator ? "" : "@" + reqCreator.username}
            </button>
            <button
              type="resolve"
              className="requestmatch-resolve"
              value="Resolve"
              onClick={handleFulfill}
              style={{ marginBottom: "10px" }}
            >
              fulfill
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
                    <p className="modal-title">fulfilled</p>
                    <p>
                      {
                        "thank you for fulfilling @" +
                          reqCreator.username +
                          "'s request!"
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
                  you can't fulfill your own request! to delete your request, go to the request
                  matches page.
                </div>
                <br />
              </div>
            </div>
          </Modal>
          <Modal className="modal" isOpen={PopUpAlrFulfilled} ariaHideApp={false}>
            <div
              style={{ backgroundColor: colors[props.index % colors.length], borderRadius: "24px" }}
            >
              <button className="modal-close" onClick={handleCloseAlrFulfilled}>
                ✘
              </button>
              <div className="modal-content">
                <p className="modal-title">already fulfilled! </p>
                <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                  see the requests you've fulfilled on the request matches page.
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

const Fulfill = (props) => {
  if (!props.userId) {
    return (
      <>
        <NavBarLogo />
        <div className="requests-container requests-item">
          <div className="flex-item" style={{ display: "block", textAlign: "center" }}>
            <img className="loginimg-size" src={login} />
            log in to help out and fulfill requests!
          </div>
        </div>
      </>
    );
  }

  const [user, setUser] = useState();
  const [fetched, setFetched] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      setFetched(true);
      get("/api/allrequests", {}).then((requestObjs) => {
        setRequests(requestObjs);
      });
    });
  }, []);

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
          enter all account info before fulfilling requests!
        </div>
      </>
    );
  }

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");

  const filterReqs = (reqs, query) => {
    if (!query) {
      return reqs;
    }
    return reqs.filter((req) => {
      return (
        req.name.toLowerCase().includes(query.toLowerCase()) ||
        req.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  let requestsList = null;
  const hasRequests = requests.length !== 0;
  if (hasRequests) {
    const timeOrder = ["hour", "day", "week", "weeks", "month"];
    requests.sort(function (a, b) {
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
    const filteredReqs = filterReqs(requests, query);
    if (filteredReqs.length !== 0) {
      requestsList = filteredReqs.map((requestObj, i) => (
        <Box
          key={`Box_${requestObj._id}`}
          creator={requestObj.creator}
          item={requestObj.name}
          description={requestObj.description}
          type={requestObj.type}
          time={requestObj.time}
          index={i}
          reqId={requestObj._id}
          userId={props.userId}
          image={requestObj.name in ImageDict ? ImageDict[requestObj.name] : ImageDict["beaver"]}
        />
      ));
    } else {
      requestsList = (
        <div style={{ paddingLeft: "15px", textAlign: "left", fontStyle: "italic" }}>
          <br />
          no requests!
        </div>
      );
    }
  } else {
    requestsList = (
      <div style={{ paddingLeft: "10px", textAlign: "left", fontStyle: "italic" }}>
        <br />
        no requests!
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ padding: "0px 50px", marginLeft: "1%" }}>
        <p className="requestmatch-title" style={{ marginTop: "-0.1%", marginBottom: "-0.1%" }}>
          fulfill
        </p>
        <SearchBar action={"/fulfill/"} />
        <div className="fulfill-container">{requestsList}</div>
      </div>
    </>
  );
};

export default Fulfill;
