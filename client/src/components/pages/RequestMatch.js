import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./RequestMatch.css";
import { get } from "../../utilities";
import { post } from "../../utilities";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let j = 0;

function Box(props) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // document.title = "request matches";
    get("/api/requests", { creator: props.userId }).then((requestObjs) => {
      setRequests(requestObjs);
    });
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

  let status;
  if (props.username === undefined) {
    status = "waiting to be fulfilled...";
  } else {
    status = "@" + props.username + " has your item!";
    //eventually link username to other user's profile (popup)
  }
  j = (j + 1) % colors.length;

  return (
    <div className="item-box" style={{ backgroundColor: colors[props.index % colors.length] }}>
      <b>item:</b> {props.item} <br />
      <br />
      <br />
      <b>{status}</b>
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

const RequestMatch = (props) => {
  if (!props.userId) {
    return (
      <div className="requests-container requests-item">log in to view your request matches!</div>
    );
  }

  const [user, setUser] = useState();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      get("/api/requests", { creator: props.userId }).then((requestObjs) => {
        setRequests(requestObjs);
      });
    });
  }, [props.userId, requests]);
    
  // ensures user has entered all info in before accessing page
  if (!user || !user.username || !user.kerb || !user.contactMethod1 || !user.contactDetails1 ||
    !user.contactMethod2 || !user.contactDetails2 || !user.location) {
      return (
        <div className="requests-container requests-item">
          enter all account info before viewing matches!
        </div>
      );
    };

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
      />
    ));
  } else {
    requestsList = <div>no requests!</div>;
  }

  return (
    <>
      <div style={{ padding: "0px 50px" }}>
        <p className="page-title">request matches</p>
        <div className="requestmatch-container">{requestsList}</div>
      </div>
    </>
  );
};

export default RequestMatch;
