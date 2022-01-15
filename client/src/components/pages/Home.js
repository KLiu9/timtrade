import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Router } from "@reach/router";

import "../../utilities.css";
import "./Home.css";
import "./CreateRequest.css";

const GOOGLE_CLIENT_ID = "113744910005-h4er20jijgm7isr3pf92sa2t062rk8l6.apps.googleusercontent.com";

const Home = (props) => {
  return (
    <div>
      <div className="flex-container flex-item">timtrade</div>
      <div className="flex-container">
        {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="home-nav"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="home-nav"
          />
        )}
      </div>
      {/* <div className="flex-container">
        <button
          // type="submit"
          className="home-about"
          style={{backgroundColor: "var(--purple)",}}
        >
          about
        </button>
      </div> */}
    </div>
  )
}

export default Home;
