import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";
import Modal from "react-modal";

import NavBar from "../modules/NavBar.js";

import "../../utilities.css";
import "./CreateRequest.css";
import "./EditAccount.css";

const initialValues = {
  item: "",
  enterItem: "",
  description: "",
  type: "", // add upload feature?
};

const EditInventory = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in to create a request!</div>;
  }

  const [user, setUser] = useState();
  const [values, setValues] = useState(initialValues);
  const [PopUp, setPopUp] = useState(false);
  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
    });
  }, []);

  // ensures user has entered all info in before accessing page
  if (
    !user ||
    !user.username ||
    !user.kerb ||
    !user.contactMethod1 ||
    !user.contactDetails1 ||
    !user.contactMethod2 ||
    !user.contactDetails2 ||
    !user.location
  ) {
    return (
      <div className="requests-container requests-item">
        enter all account info before listing items!
      </div>
    );
  }

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

  const handleSubmit = (event) => {
    console.log(values);
    if (
      values.item !== "" &&
      !(values.item === "other" && values.enterItem === "") &&
      values.description !== "" &&
      values.type !== ""
    ) {
      event.preventDefault();
      // if user chose to enter own item, set values.item to be that item
      if (values.item === "other") {
        values.item = values.enterItem;
      }
      const body = { creator: props.userId, content: values };
      post("/api/listItem", body).then((requestObj) => {
        setValues(initialValues);
        navigate("/account/");
      });
    } else {
      event.preventDefault();
      console.log("fill in all the boxes");
      handleOpen();
    }
  };

  //   const handleBadSubmit = (event) => {
  //     event.preventDefault();
  //   };

  const itemOptions = ["", "batteries", "tape", "mug", "chair", "other"];

  return (
    <div>
      <NavBar/>
      <div style={{ padding: "0px 50px" }}>
        <p className="page-title">
          add to
          <br />
          inventory
        </p>
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
                  maxlength="30"
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
              maxlength="100"
            />
            <p className="request-label">type of listing:</p>
            <select
              prompt={values.type}
              onChange={handleTypeChange}
              name="type"
              className="createrequest-box"
              style={{ backgroundColor: "var(--blue)" }}
            >
              <option value="select"></option>
              <option value="sell">sell</option>
              <option value="trade">trade</option>
              <option value="lend">lend</option>
            </select>
            <button
              type="submit"
              className="createrequest-submit"
              value="Submit"
              style={{ backgroundColor: "var(--green)" }}
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
                <div className="modal-content" style={{ fontWeight: "bold" }}>please complete all fields!</div>
                <br />
                <br />
              </div>
            </Modal>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;
