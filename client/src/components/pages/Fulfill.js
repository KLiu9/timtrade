import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Fulfill.css";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let i = 0;

function Box(props) {
  i = (i + 1) % colors.length;
  let number = "1";
  if (props.time === "weeks") {
    number = "2";
  }
  let tradeInfo = props.type + " within " + number + " " + props.time;
  return (
    <div className="fulfill-item-box" style={{ backgroundColor: colors[i] }}>
      <div class="fulfill-item-box-inner">
        <div class="fulfill-item-box-front">
          {/* front side */}
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          <b>{props.creator}</b>
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
        <div class="fulfill-item-box-back">
          {/* back side */}
          <b>item:</b> {props.item} <br />
          <b>description:</b> {props.description} <br />
          <br />
          <b>{props.creator}</b>
          <br />
          <br />
          <br />
          <br />
          <button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            style={{
              backgroundColor: "var(--pink)",
            }}
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
      <div className="requests-container requests-item">log in before using the fulfill page!</div>
    );
  }

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    get("/api/allrequests", {}).then((requestObjs) => {
      //console.log("hi", requestObjs);
      setRequests(requestObjs);
    });
  }, []);

  let requestsList = null;
  let timeIndices = null;
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
    requestsList = requests.map((requestObj) => (
      <Box
        key={`Box_${requestObj._id}`}
        creator={requestObj.creator}
        item={requestObj.name}
        description={requestObj.description}
        type={requestObj.type}
        time={requestObj.time}
        //userId={props.userId}
      />
    ));
  } else {
    requestsList = <div>no requests!</div>;
  }

  return (
    <>
      <div style={{ padding: "0px 50px" }}>
        <div className="search-container">
          <form>
            <input className="search-box" type="text" placeholder="search..." name="search" />
            <button className="search-button" type="search">
              go
            </button>
          </form>
        </div>
        <div className="fulfill-container">{requestsList}</div>
      </div>
    </>
  );
};

export default Fulfill;
