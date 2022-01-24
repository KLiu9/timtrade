import React from "react";
import NavBar from "../modules/NavBar.js";
import notfound from "../../../dist/images/404.png";
import beaver from "../../../dist/images/404beaver.png";

const NotFound = () => {
  return (
    <div>
      <NavBar />
      <div className="u-margin">
        <center>
          <img src={notfound} width="35%" height="35%" class="center"></img>
        </center>
        <br />
        <center>
          <img src={beaver} width="35%" height="35%"></img>
        </center>
        <p>
          <i>
            <center>The page you requested couldn't be found.</center>
          </i>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
