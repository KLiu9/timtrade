import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import timtrade from "../../../dist/images/timtrade.png";

import "../../utilities.css";
import "./Home.css";
import "./CreateRequest.css";

const GOOGLE_CLIENT_ID = "113744910005-h4er20jijgm7isr3pf92sa2t062rk8l6.apps.googleusercontent.com";

const Home = (props) => {
  return (
    <div className="flex-container">
      <div className="flex-container">
        <img className="home-img-size flex-item" src={timtrade} />
      </div>
      <span className="home-nav flex-item">
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
          <button
            // type="submit"
            className="home-about"
            style={{backgroundColor: "#DBF3FA",}}
          >
            about
          </button>
      </span>
    </div>
  )
}

export default Home;
