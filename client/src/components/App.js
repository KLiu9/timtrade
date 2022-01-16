import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Home from "./pages/Home.js";
import Account from "./pages/Account.js";
import EditAccount from "./pages/EditAccount.js";
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
    // eventually remove navbar from home page (home page has 4 buttons + login)
    // home page also probably shouldn't be on navbar
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <Router>
        <Home path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <Account path="/account/:userId" />
        <EditAccount path="/account/edit/:userId" />
        <Requests path="/requests/" />
        <Explore path="/explore/" />
        <Fulfill path="/fulfill/" />
        <CreateRequest path="/requests/createrequest/" />
        <RequestMatch path="/requests/requestmatch/" />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
