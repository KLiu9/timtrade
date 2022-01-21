import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

const Explore = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in to explore items!</div>;
  }

  const [user, setUser] = useState();
  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
    });
  }, []);
    
  // ensures user has entered all info in before accessing page
  if (!user || !user.username || !user.kerb || !user.contactMethod1 || !user.contactDetails1 ||
    !user.contactMethod2 || !user.contactDetails2 || !user.location) {
      return (
        <div className="requests-container requests-item">
          enter all account info before exploring items!
        </div>
      );
    };

  return (
    <div className="u-margin">explore page</div>
  );
};

export default Explore;
