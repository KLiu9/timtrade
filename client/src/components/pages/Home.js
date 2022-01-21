import React, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import timtrade from "../../../dist/images/timtrade.png";
import beaverimg from "../../../dist/images/beaver icon.png";
import Modal from "react-modal";

import "../../utilities.css";
import "./Home.css";
import "./CreateRequest.css";

const GOOGLE_CLIENT_ID = "113744910005-h4er20jijgm7isr3pf92sa2t062rk8l6.apps.googleusercontent.com";

const Home = (props) => {
  const [PopUp, setPopUp] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);

  return (
    <div className="flex-container">
      <div className="flex-container">
        {/* <img className="home-icon-size flex-item" src={beaverimg} /> */}
        <img className="home-img-size flex-item center" src={timtrade} />
      </div>
      <span className="home-nav flex-item">
        {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            // className="home-nav"
            render={(item) => (
              <button onClick={item.onClick} className="login-button">
                logout
              </button>
            )}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            // className="home-nav"
            render={(item) => (
              <button onClick={item.onClick} className="login-button">
                login
              </button>
            )}
          />
        )}
        <button
          className="about-button"
          style={{ backgroundColor: "var(--blue)" }}
          onClick={handleOpen}
        >
          about
        </button>
        <Modal className="modal" isOpen={PopUp} ariaHideApp={false}>
          <button className="modal-close" onClick={handleClose}>
            ✘
          </button>
          <div className="modal-content">
            <div>
              <p className="modal-title">welcome to timtrade!</p>
              <p> &gt; a marketplace for the mit community &lt; </p>
              <p> &gt; create requests and add to your inventory &lt; </p>
              <p> &gt; explore various items and fulfill requests &lt; </p>
              {/* <ul>
                  <li>marketplace for the mit community</li>
                  <li>create requests and add to your inventory</li>
                  <li>explore others' items and requests</li>
                </ul> */}
              <p className="modal-names"> - katie, anna, emily</p>
            </div>
          </div>
        </Modal>
      </span>
    </div>
  );
};

export default Home;
