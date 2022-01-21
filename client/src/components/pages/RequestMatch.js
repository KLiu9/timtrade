import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../utilities.css";
import "./RequestMatch.css";
import { get } from "../../utilities";
import { post } from "../../utilities";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let j = 0;

function Box(props) {
  const [requests, setRequests] = useState([]);
  const [PopUp, setPopUp] = useState(false);
  const [fulfillers, setFulfillers] = useState([]);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  let fulfillerUsernames = [];
  useEffect(() => {
    // document.title = "request matches";
    get("/api/requests", { creator: props.userId }).then((requestObjs) => {
      setRequests(requestObjs);
    });
    if (props.fulfilled && props.fulfilled.length !== 0) {
      for (let ind = 0; ind < props.fulfilled.length; ind++) {
        get(`/api/user`, { userid: props.fulfilled[ind] }).then((userObj) => {
          setFulfillers((oldArray) => [...oldArray, userObj.username]);
        });
      }
    }
  }, []);

  const handleResolve = (event) => {
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
        console.log("request", request);
      });
    }
  };
  fulfillerUsernames = fulfillers.map((x) => (
    <>
      <p>{"@" + x}</p>
    </>
  ));
  j = (j + 1) % colors.length;
  return (
    <div className="item-box" style={{ backgroundColor: colors[props.index % colors.length] }}>
      <b>item:</b> {props.item} <br />
      <br />
      <br />
      {/*<b>{status}</b>*/}
      {!props.fulfilled || props.fulfilled.length === 0 ? (
        <>
          <b>waiting to be fulfilled...</b>
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
          <Modal className="modal" isOpen={PopUp}>
            <button className="modal-close" onClick={handleClose}>
              ✘
            </button>
            <div className="modal-content">{fulfillerUsernames}</div>
          </Modal>
        </>
      )}
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
        onClick={handleResolve}
      >
        resolve
      </button>
    </div>
  );
}

function FulfillBox(props) {
  const [reqCreator, setReqCreator] = useState();
  const [PopUp, setPopUp] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  useEffect(() => {
    get(`/api/user`, { userid: props.creator }).then((userObj) => {
      setReqCreator(userObj);
    });
  }, []);

  const handleUnfulfill = (event) => {
    event.preventDefault();
    const body = { reqId: props.reqId, fulfillerId: props.userId };
    post("/api/unfulfill", body).then((result) => {
      console.log("result", result);
    });
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
          <b>{!reqCreator ? "" : "@" + reqCreator.username}</b>
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
            onClick={handleUnfulfill}
          >
            unfulfill
          </button>
        </div>
      </div>
    </div>
  );
}

const RequestMatch = (props) => {
  if (!props.userId) {
    return (
      <div className="requests-container requests-item">log in to view your request matches!</div>
    );
  }

  const [user, setUser] = useState();
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
  }, [props.userId, requests]);

  // ensures user has entered all info in before accessing page
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
      <div className="requests-container requests-item">
        enter all account info before viewing matches!
      </div>
    );
  }

  // useEffect(() => {
  //   // document.title = "request matches";
  //   if (props.userId !== undefined) {
  //     get("/api/requests", { creator: props.userId }).then((requestObjs) => {
  //       setRequests(requestObjs);
  //     });
  //   }
  // }, [props.userId, requests]);

  let requestsList = null;
  const hasRequests = requests.length !== 0;
  if (hasRequests) {
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
    requestsList = <div>no requests!</div>;
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
    fulfillsList2 = fulfillsList.map((requestObj) => (
      <FulfillBox
        key={`Box_${requestObj._id}`}
        item={requestObj.name}
        creator={requestObj.creator}
        time={requestObj.time}
        type={requestObj.type}
        index={0}
        description={requestObj.description}
        reqId={requestObj._id}
        userId={props.userId}
      />
    ));
  } else {
    fulfillsList2 = <div>you have not fulfilled any requests!</div>;
  }

  return (
    <>
      <div style={{ padding: "0px 50px" }}>
        <p className="page-title">request matches</p>
        <br /> {/**SOMEONE PLS HELP FIX LOL */}
        <p className="requestmatch-subtitle">items you requested</p>
        <div className="requestmatch-container">{requestsList}</div>
        <p className="requestmatch-subtitle">items you fulfilled</p>
        <div className="requestmatch-container">{fulfillsList2}</div>
      </div>
    </>
  );
};

export default RequestMatch;
