import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./RequestMatch.css";
import { get } from "../../utilities";
import { post } from "../../utilities";
import { Link } from "@reach/router";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let i = 0;

function Box(props) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // document.title = "request matches";
    get("/api/requests", { creator: props.userId }).then((requestObjs) => {
      // console.log("bye", props.userId);
      // console.log("61e4d99700fa5b28b75a9f9b");
      setRequests(requestObjs);
    });
  }, []);

  const handleResolve = (event) => {
    event.preventDefault();
    //console.log("requests before pressing resolve", requests);
    //console.log("request being resolved", props);

    let done = false;
    let i = 0;
    while (!done && i < requests.length) {
      /*console.log(i, requests[i]);
      console.log(requests[i].name);
      console.log(props.item);*/
      if (
        requests[i].name === props.item &&
        requests[i].description === props.description &&
        requests[i].type === props.type
      ) {
        //console.log("found match");
        done = true;
      } else {
        i++;
      }
    }

    if (i < requests.length) {
      //console.log("index of match: ", i);
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
    //console.log("requests after pressing resolve", requests);
  };

  let status;
  if (props.username === undefined) {
    status = "waiting to be fulfilled...";
  } else {
    status = "@" + props.username + " has your item!";
    //eventually link username to other user's profile (popup)
  }
  i = (i + 1) % colors.length;

  return (
    <div className="item-box" style={{ backgroundColor: colors[i] }}>
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
        <Link to="/requests/" className="edit-link" userId={props.userId}>
          resolve
        </Link>
      </button>
    </div>
  );
}

const RequestMatch = (props) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // document.title = "request matches";
    get("/api/requests", { creator: props.userId }).then((requestObjs) => {
      // console.log("bye", props.userId);
      // console.log("61e4d99700fa5b28b75a9f9b");
      // console.log("hi", requestObjs);
      setRequests(requestObjs);
    });
  }, []);
  /*const handleResolve = (event) => {
    event.preventDefault();
    // const body = { creator: props.userId, name: values.item, description: values.description, type: values.type, time: values.time };
    console.log("initial requests", requests);
  };*/

  let requestsList = null;
  const hasRequests = requests.length !== 0;
  if (hasRequests) {
    requestsList = requests.map((requestObj) => (
      <Box
        key={`Box_${requestObj._id}`}
        creator={requestObj.creator}
        item={requestObj.name}
        description={requestObj.description}
        type={requestObj.type}
        time={requestObj.time}
        userId={props.userId}
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