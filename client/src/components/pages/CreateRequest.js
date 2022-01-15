import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./CreateRequest.css";

const initialValues = {
  item: "",
  description: "",
  type: "",
  time: "",
};

const CreateRequest = (props) => {
  
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, prompt } = event.target;
    setValues({...values, [name]: prompt});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.history.push('/requests')
    // props.onSubmit && props.onSubmit(value);
    setValues(initialValues)
  };

  const itemOptions = ["", "batteries", "tape", "mug", "chair", "other"]

  return (
    <div style={{padding:"0px 50px"}}>
      <p className="page-title">create a<br/>request</p>
      <div className="createrequest-container">
        <p className="request-label">select an item below:</p>
        <form>
            <select
              prompt={values.item}
              onChange={handleChange}
              name="item"
              className="createrequest-box"
              style={{backgroundColor: "var(--purple)"}}
            >
              {itemOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          <p className="request-label">or enter your own item:</p>
            <input
              prompt={values.item}
              onChange={handleChange}
              type="text"
              placeholder="a succulent"
              className="createrequest-box"
            />
          <p className="request-label">add a brief description:</p>
            <input
              prompt={values.description}
              onChange={handleChange}
              type="text"
              placeholder="include specifications such as number, size, and more"
              className="createrequest-box"
            />
          <p className="request-label">type of request:</p>
            <select
              prompt={values.type}
              onChange={handleChange}
              name="type"
              className="createrequest-box"
              style={{backgroundColor: "var(--blue)"}}
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
              style={{backgroundColor: "var(--yellow)"}}
              onChange={handleChange}
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
            style={{backgroundColor: "var(--green)",}}
            // onClick={handleSubmit}
          >
            submit
            {/* <Link to="/requests/">
              submit
            </Link> */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
