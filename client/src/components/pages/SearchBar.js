import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-container">
      <form method="get" action="/fulfill/">
        <input className="search-box" type="text" placeholder="search..." name="s" />
        <button className="search-button" type="submit">
          go
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
