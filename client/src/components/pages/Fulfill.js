import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Modal from "react-modal";

import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";
import SearchBar from "../modules/SearchBar.js";

import "../../utilities.css";
import "./Fulfill.css";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
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
      post("/api/updateRequest", body).then((result) => {
        //console.log("result", result);
      });
      /*const body = { _id: props.userId};
    post("/api/updateUserInfo", body).then((result) => {
      console.log("result", result);
    });*/
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
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          <b style={{ textDecoration: "underline"}}>
            {!reqCreator ? "" : "@" + reqCreator.username}
          </b>
          <br />
          <br />
          <br />
          <div>{tradeInfo}</div>
          <br />
          {/*<button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            style={{
              backgroundColor: "#E5E5E5",
            }}
            // onClick={handleLearn}
          >
            learn more
          </button>*/}
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
          <br />
          <br />
          <button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            onClick={handleFulfill}
          >
            fulfill
          </button>
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
                          "'s request!" /** add more here? */
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
          log in to help out and fulfill requests!
        </div>
      </>
    );
  }

  const [user, setUser] = useState();
  const [allUserInfo, setAllUserInfo] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      get("/api/allrequests", {}).then((requestObjs) => {
        setRequests(requestObjs);
      });
    });
    // if (!user || !user.username || !user.kerb || !user.contactMethod1 || !user.contactDetails1 ||
    // !user.contactMethod2 || !user.contactDetails2 || !user.location) {
    //   setAllUserInfo(false);
    // }
    setAllUserInfo(
      !user ||
        !user.username ||
        !user.kerb ||
        !user.contactMethod1 ||
        !user.contactDetails1 ||
        !user.contactMethod2 ||
        !user.contactDetails2 ||
        !user.location
    );
    // console.log(user);
  }, []);

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");

  const filterReqs = (reqs, query) => {
    if (!query) {
      return reqs;
    }
    return reqs.filter((req) => {
      //console.log(req);
      //const reqLower = req.name.toLowerCase();
      return (
        req.name.toLowerCase().includes(query.toLowerCase()) ||
        req.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  let requestsList = null;
  const hasRequests = requests.length !== 0;
  if (hasRequests) {
    //console.log("requests", requests);
    const timeOrder = ["hour", "day", "week", "weeks", "month"];
    requests.sort(function (a, b) {
      //console.log("sorting");
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
    //console.log("after sort", requests);
    const filteredReqs = filterReqs(requests, query);
    if (filteredReqs.length !== 0) {
      //console.log(filteredReqs);
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

  return allUserInfo ? (
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
  ) : (
    <div className="requests-container requests-item">
      enter all account info before fulfilling requests!
    </div>
  );
};

export default Fulfill;
