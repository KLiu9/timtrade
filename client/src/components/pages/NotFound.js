import React from "react";
import NavBar from "../modules/NavBar.js";

const NotFound = () => {
  return (
    <div>
      <NavBar/>
      <div className="u-margin">
        <h1>404 Not Found</h1>
        <p>The page you requested couldn't be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
