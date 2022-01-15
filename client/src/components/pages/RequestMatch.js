import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./RequestMatch.css";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let i = 0;

function Box(props) {
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
        // onClick={handleSubmit}
      >
        resolve
      </button>
    </div>
  );
}

const RequestMatch = () => {
  return (
    <div style={{ padding: "0px 50px" }}>
      <p className="page-title">request matches</p>
      <div className="requestmatch-container">
        <Box item="batteries" username="bobaconnoisseur" />
        <Box item="mug" username="baobasaur" />
        <Box item="plant" />
        <Box item="plant" />
        <Box item="plant" />
        <Box item="plant" />
      </div>
    </div>
  );
};

export default RequestMatch;
