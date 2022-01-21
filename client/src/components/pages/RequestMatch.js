import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../utilities.css";
import "./RequestMatch.css";
import { get } from "../../utilities";
import { post } from "../../utilities";
import { navigate } from "@reach/router";

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
    // if (props.userId !== undefined) {
    get("/api/requests", { creator: props.userId }).then((requestObjs) => {
      // console.log("bye", props.userId);
      // console.log("61e4d99700fa5b28b75a9f9b");
      setRequests(requestObjs);
    });
    if (props.fulfilled && props.fulfilled.length !== 0) {
      for (let ind = 0; ind < props.fulfilled.length; ind++) {
        console.log(props.fulfilled[ind]);
        get(`/api/user`, { userid: props.fulfilled[ind] }).then((userObj) => {
          console.log(userObj);
          setFulfillers((oldArray) => [...oldArray, userObj.username]);
        });
      }
    }
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
    // navigate("/requests/");
    //console.log("requests after pressing resolve", requests);
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

const RequestMatch = (props) => {
  if (!props.userId) {
    return (
      <div className="requests-container requests-item">log in to view your request matches!</div>
    );
  }

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // document.title = "request matches";
    if (props.userId !== undefined) {
      get("/api/requests", { creator: props.userId }).then((requestObjs) => {
        // console.log("bye", props.userId);
        // console.log("61e4d99700fa5b28b75a9f9b");
        // console.log("hi", requestObjs);
        setRequests(requestObjs);
      });
    }
  }, [props.userId, requests]);
  /*const handleResolve = (event) => {
    event.preventDefault();
    // const body = { creator: props.userId, name: values.item, description: values.description, type: values.type, time: values.time };
    console.log("initial requests", requests);
  };*/

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
