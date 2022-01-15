import React, { useState, useEffect } from "react";

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
      <b>item:</b> {props.item} <br />
      <br />
      <br />
      <b>@{props.username}</b>
      <br />
      <br />
      <br />
      {tradeInfo}
      <br />
      <button
        type="resolve"
        className="requestmatch-resolve"
        value="Resolve"
        style={{
          backgroundColor: "#E5E5E5",
        }}
        // onClick={handleSubmit}
      >
        learn more
      </button>
    </div>
  );
}

const Fulfill = () => {
  return (
    <div style={{ padding: "0px 50px" }}>
      <div className="search-container">
        <form>
          <input className="search-box" type="text" placeholder="search..." name="search" />
          <button type="search">go</button>
        </form>
      </div>
      <div className="fulfill-container">
        <Box item="safety pins" username="username1" type="buy" time="hour" />
        <Box item="hair dryer" username="username2" type="borrow" time="hour" />
        <Box item="duct tape" username="username3" type="trade" time="day" />
        <Box item="black heels" username="username5" type="borrow" time="week" />
        <Box item="lamp" username="username4" type="buy" time="weeks" />
        <Box item="drying rack" username="username6" type="buy" time="month" />
      </div>
    </div>
  );
};

export default Fulfill;
