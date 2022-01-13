import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Requests.css";

const Requests = () => {
    return (
        <div className="requests-container">
            <a className="requests-item">create a request</a>
            <a className="requests-item">request matches</a>
        </div>
    );
};

export default Requests;