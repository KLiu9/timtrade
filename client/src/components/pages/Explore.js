import React, { useState, useEffect } from "react";

const Explore = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in before using the explore page!</div>;
  }

  return (
    <div className="u-margin">explore page</div>
  );
};

export default Explore;
