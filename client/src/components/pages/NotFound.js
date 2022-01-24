import React from "react";
import NavBar from "../modules/NavBar.js";
import notfound from "../../../dist/images/404.png";
import beaver from "../../../dist/images/404beaver.png";

const NotFound = () => {
  return (
    <div>
      <NavBar />
      <div className="u-margin" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <img src={notfound} width="35%" height="35%" class="center" />
          <img src={beaver} width="35%" height="35%"/>
          <p style={{ fontStyle: "italic" }}> the page you requested couldn't be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
