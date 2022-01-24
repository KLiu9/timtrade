import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";
import Modal from "react-modal";

import NavBar from "../modules/NavBar.js";
import NavBarLogo from "../modules/NavBarLogo.js";

import "../../utilities.css";
import "./CreateRequest.css";
import "./EditAccount.css";
import fillerimg from "../../../dist/images/createreqpage.png";

const initialValues = {
  item: "",
  enterItem: "", // for user to enter own item
  description: "",
  type: "",
  time: "",
};

const CreateRequest = (props) => {
  if (!props.userId) {
    return (
      <>
        <NavBarLogo />
        <div className="requests-container requests-item">log in to create a request!</div>
      </>
    );
  }

  const [user, setUser] = useState();
  const [allUserInfo, setAllUserInfo] = useState(true);
  const [values, setValues] = useState(initialValues);
  const [PopUp, setPopUp] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
    });
    setAllUserInfo(
      !user ||
        !user.username ||
        !user.kerb ||
        !user.contactMethod1 ||
        !user.contactDetails1 ||
        !user.contactMethod2 ||
        !user.contactDetails2 ||
        !user.location
    );
  }, []);

  const handleItemChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, item: prompt });
  };

  const handleEnterItemChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, enterItem: prompt });
  };

  const handleDescriptionChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, description: prompt });
  };

  const handleTypeChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, type: prompt });
  };

  const handleTimeChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, time: prompt });
  };

  const handleSubmit = (event) => {
    if (
      values.item !== "" &&
      !(values.item === "other" && values.enterItem === "") &&
      values.description !== "" &&
      values.type !== "" &&
      values.time !== ""
    ) {
      event.preventDefault();
      // if user chose to enter own item, set values.item to be that item
      if (values.item === "other") {
        values.item = values.enterItem;
      }
      const body = { creator: props.userId, content: values };
      post("/api/request", body).then((requestObj) => {
        setValues(initialValues);
        navigate("/requests/match");
      });
    } else {
      event.preventDefault();
      handleOpen();
    }
  };

  const itemOptions = [
    "",
    "batteries",
    "tape",
    "mug",
    "chair",
    "fridge",
    "hair ties",
    "rice cooker",
    "kettle",
    "tide pods",
    "laundry detergent",
    "shampoo",
    "soap",
    "toothpaste",
    "other",
  ];

  return allUserInfo ? (
    <div>
      <NavBar />
      <div>
        <div className="page-title">
          <p style={{ paddingRight: "10%" }}>
            create a<br />
            request
          </p>
          {/* help w formatting image */}
          <img className="fillerimg-size" src={fillerimg} style={{ marginTop: "-4%" }} />
        </div>
        <div className="createrequest-container">
          <p className="request-label">select an item below:</p>
          <form>
            <select
              prompt={values.item}
              onChange={handleItemChange}
              name="item"
              className="createrequest-box"
              style={{ backgroundColor: "var(--purple)" }}
            >
              {itemOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* only shows this box if other is selected */}
            {values.item === "other" && (
              <>
                <p className="request-label">or enter your own item:</p>
                <input
                  prompt={values.enterItem}
                  onChange={handleEnterItemChange}
                  type="text"
                  placeholder="a succulent"
                  className="createrequest-box"
                  maxLength="30"
                />
              </>
            )}
            <p className="request-label">add a brief description:</p>
            <input
              prompt={values.description}
              onChange={handleDescriptionChange}
              type="text"
              placeholder="include specifications such as number, size, and more"
              className="createrequest-box"
              maxLength="100"
            />
            <p className="request-label">type of request:</p>
            <select
              prompt={values.type}
              onChange={handleTypeChange}
              name="type"
              className="createrequest-box"
              style={{ backgroundColor: "var(--blue)" }}
            >
              <option value="select"></option>
              <option value="buy">buy</option>
              <option value="trade">trade</option>
              <option value="borrow">borrow</option>
            </select>
            <p className="request-label">time needed by: </p>
            <select
              prompt={values.time}
              name="time"
              className="createrequest-box"
              style={{ backgroundColor: "var(--yellow)" }}
              onChange={handleTimeChange}
            >
              <option value="select"></option>
              <option value="hour">within 1 hour</option>
              <option value="day">within 1 day</option>
              <option value="week">within 1 week</option>
              <option value="weeks">within 2 weeks</option>
              <option value="month">within 1 month</option>
            </select>
            <button
              type="submit"
              className="createrequest-submit"
              value="Submit"
              style={{ backgroundColor: "var(--oldgreen)" }}
              onClick={handleSubmit}
            >
              submit
            </button>
            <Modal className="modal2" isOpen={PopUp} ariaHideApp={false}>
              <div>
                <button className="modal-close" onClick={handleClose}>
                  ✘
                </button>
                <br />
                <div className="modal-content" style={{ fontWeight: "bold" }}>
                  please complete all fields!
                </div>
                <br />
                <br />
              </div>
            </Modal>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="requests-container requests-item">
      enter all account info before creating requests!
    </div>
  );
};

export default CreateRequest;
