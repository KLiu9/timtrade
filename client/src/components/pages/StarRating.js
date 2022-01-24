import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./StarRating.css";

const StarRating = (props) => {
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0);
  /*const handleStarSubmit = (event) => {
    event.preventDefault();
    prompt = event.target.key;
    setRating(prompt);
    console.log(rating);
  };*/
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            value={index}
            className={index <= (hover || starRating) ? "on" : "off"}
            onClick={() => {
              setStarRating(index);
              //console.log(starRating);
              props.handleStarRating(index);
            }}
            style={{ backgroundColor: "transparent" }}
            //onClick={handleStarSubmit}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(starRating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
