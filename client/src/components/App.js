import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Home from "./pages/Home.js";
import Account from "./pages/Account.js";
import EditAccount from "./pages/EditAccount.js";
import EditInventory from "./pages/EditInventory.js";
import Requests from "./pages/Requests.js";
import Explore from "./pages/Explore.js";
import Fulfill from "./pages/Fulfill.js";
import CreateRequest from "./pages/CreateRequest.js";
import RequestMatch from "./pages/RequestMatch.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [user, setUser] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registered in the database, and currently logged in.
        /*setUserId(user._id);*/
        get(`/api/user`, { userid: user._id }).then((userObj) => {
          setUser(userObj);
          setUserId(user._id);
        });
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    console.log(`Your email is ${res.profileObj.email}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      post("/api/initsocket", { socketid: socket.id });
      get(`/api/user`, { userid: user._id }).then((userObj) => {
        setUser(userObj);
        setUserId(user._id);
      });
    });
  };

  const handleLogout = () => {
    console.log(`Logged out`);
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <Router>
        <Home path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId}/>
        <Account path="/account/" userId={userId}/>
        <EditAccount path="/account/edit/" userId={userId}/>
        <EditInventory path="/account/editinventory/" userId={userId}/>
        <Requests path="/requests/" userId={userId}/>
        <Explore path="/explore/" userId={userId}/>
        <Fulfill path="/fulfill/" userId={userId}/>
        <CreateRequest path="/requests/create/" userId={userId}/>
        <RequestMatch path="/requests/match/" userId={userId}/>
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
