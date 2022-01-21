import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Fulfill.css";
import Modal from "react-modal";

import SearchBar from "../modules/SearchBar.js";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let i = 0;

function Box(props) {
  const [reqCreator, setReqCreator] = useState();
  const [PopUp, setPopUp] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  useEffect(() => {
    get(`/api/user`, { userid: props.creator }).then((userObj) => {
      setReqCreator(userObj);
    });
  }, []);

  const handleFulfill = (event) => {
    event.preventDefault();
    const body = { reqId: props.reqId, creatorId: props.userId };
    post("/api/updateRequest", body).then((result) => {
      console.log("result", result);
    });
    /*const body = { _id: props.userId};
    post("/api/updateUserInfo", body).then((result) => {
      console.log("result", result);
    });*/
  };

  //console.log("hihi", reqCreator);
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
          <b>{!reqCreator ? "" : "@" + reqCreator.username}</b>
          <br />
          <br />
          <br />
          {tradeInfo}
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
          <Modal className="modal" isOpen={PopUp}>
            <button className="modal-close" onClick={handleClose}>
              ✘
            </button>
            <div className="modal-content">
              {reqCreator && (
                <div>
                  <p className="modal-title">{"@" + reqCreator.username}</p>
                  <p> name: {reqCreator.name}</p>
                  <p>{reqCreator.contactMethod1 + ": " + reqCreator.contactDetails1}</p>
                  <p> {reqCreator.contactMethod2 + ": " + reqCreator.contactDetails2} </p>
                  <p> location: {reqCreator.location}</p>
                </div>
              )}
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
        </div>
      </div>
    </div>
  );
}

const Fulfill = (props) => {
  if (!props.userId) {
    return (
      <div className="requests-container requests-item">
        log in to help out and fulfill requests!
      </div>
    );
  }

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    get("/api/allrequests", {}).then((requestObjs) => {
      //console.log("hi", requestObjs);
      setRequests(requestObjs);
    });
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
      console.log(filteredReqs);
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
      requestsList = <div>no requests!</div>;
    }
  } else {
    requestsList = <div>no requests!</div>;
  }

  return (
    <>
      <div style={{ padding: "0px 50px" }}>
        <SearchBar />
        <div className="fulfill-container">{requestsList}</div>
      </div>
    </>
  );
};

export default Fulfill;
