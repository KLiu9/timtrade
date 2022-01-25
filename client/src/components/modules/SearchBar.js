import React from "react";
import searchimg from "../../../dist/images/search.png";

import "../../utilities.css";
import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div className="search-container">
      <form method="get" action={props.action}>
        <input className="search-box" type="text" placeholder="search..." name="s" />
        <button className="search-button" type="submit">
          <img className="search-img-size" src={searchimg} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
