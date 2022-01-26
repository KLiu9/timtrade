import React, { useState } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Modal from "react-modal";

import timtrade from "../../../dist/images/timtrade.png";
import acc1 from "../../../dist/homeimages/accounthome.png";
import acc2 from "../../../dist/homeimages/accounthome2.png";
import acct from "../../../dist/homeimages/accounthometext.png";
import exp1 from "../../../dist/homeimages/explorehome.png";
import exp2 from "../../../dist/homeimages/explorehome2.png";
import expt from "../../../dist/homeimages/explorehometext2.png";
import ful1 from "../../../dist/homeimages/fulfillhome.png";
import ful2 from "../../../dist/homeimages/fulfillhome2.png";
import fult from "../../../dist/homeimages/fulfillhometext.png";
import req1 from "../../../dist/homeimages/requesthome.png";
import req2 from "../../../dist/homeimages/requesthome2.png";
import reqt from "../../../dist/homeimages/requesthometext.png";

import "../../utilities.css";
import "./Home.css";
import "./CreateRequest.css";

const GOOGLE_CLIENT_ID = "113744910005-h4er20jijgm7isr3pf92sa2t062rk8l6.apps.googleusercontent.com";

const Home = (props) => {
  const [PopUp, setPopUp] = useState(false);
  const [accIcon, setAccIcon] = useState(false);
  const [expIcon, setExpIcon] = useState(false);
  const [reqIcon, setReqIcon] = useState(false);
  const [fulIcon, setFulIcon] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ height: "100vh", width: "40vw" }}>
        <Link
          to="/account/"
          className="NavBar-link"
          onMouseEnter={() => {
            setAccIcon(true);
          }}
          onMouseLeave={() => {
            setAccIcon(false);
          }}
        >
          <div className="image-container">
            <img className="icon-size" src={accIcon ? acc2 : acc1} />
            <img className="icon-size" src={acct} style={{ marginTop: "-2vh" }} />
          </div>
        </Link>
        <Link
          to="/explore/"
          className="NavBar-link"
          onMouseEnter={() => {
            setExpIcon(true);
          }}
          onMouseLeave={() => {
            setExpIcon(false);
          }}
        >
          <div className="image-container">
            <img
              className="icon-size"
              src={expIcon ? exp2 : exp1}
              style={{ marginTop: expIcon ? "0.3vh" : "0", marginBottom: expIcon ? "-0.3vh" : "0" }}
            />
            <img className="icon-size" src={expt} />
          </div>
        </Link>
      </div>
      <div className="flex-container">
        <div>
          <img className="home-img-size" src={timtrade} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            {props.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="logout"
                onLogoutSuccess={props.handleLogout}
                onFailure={(err) => console.log(err)}
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
          </div>
        </div>
      </div>
      <div style={{ height: "100vh", width: "40vw" }}>
        <Link
          to="/requests/"
          className="NavBar-link"
          onMouseEnter={() => {
            setReqIcon(true);
          }}
          onMouseLeave={() => {
            setReqIcon(false);
          }}
        >
          <div className="image-container">
            <img className="icon-size" src={reqIcon ? req2 : req1} />
            <img className="icon-size" src={reqt} />
          </div>
        </Link>
        <Link
          to="/fulfill/"
          className="NavBar-link"
          onMouseEnter={() => {
            setFulIcon(true);
          }}
          onMouseLeave={() => {
            setFulIcon(false);
          }}
        >
          <div className="image-container">
            <img className="icon-size" src={fulIcon ? ful2 : ful1} />
            <img className="icon-size" src={fult} style={{ marginTop: "-2vh" }} />
          </div>
        </Link>
      </div>
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
            <p className="modal-names"> - katie, anna, emily</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
