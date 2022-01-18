import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./CreateRequest.css";
import { post } from "../../utilities";
import "./EditAccount.css";

const initialValues = {
  item: "",
  description: "",
  type: "",
  time: "",
};

const CreateRequest = (props) => {
  
  const [values, setValues] = useState(initialValues);

  // const handleChange = (event) => {
  //   const { name, prompt } = event.target.value;
  //   console.log("name", name, "prompt", prompt);
  //   setValues({...values, [name]: prompt});
  // };

  const handleItemChange = (event) => {
    const prompt = event.target.value;
    setValues({...values, "item": prompt});
  };

  const handleDescriptionChange = (event) => {
    const prompt = event.target.value;
    setValues({...values, "description": prompt});
  };

  const handleTypeChange = (event) => {
    const prompt = event.target.value;
    setValues({...values, "type": prompt});
  };

  const handleTimeChange = (event) => {
    const prompt = event.target.value;
    setValues({...values, "time": prompt});
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // const body = { creator: props.userId, name: values.item, description: values.description, type: values.type, time: values.time };
    console.log("initial values", values);
    const body = { creator: props.userId, content: values };
    // post("/api/request", body);
    post("/api/request", body).then((request) => {
      console.log("request", request);
    });
    setValues(initialValues);
    useNavigate('/requests')
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
              onChange={handleItemChange}
              name="item"
              className="createrequest-box"
              style={{backgroundColor: "var(--purple)"}}
            >
              {itemOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {values.item==="other" && 
              <>
              <p className="request-label">or enter your own item:</p>
                <input
                  prompt={values.item}
                  onChange={handleItemChange}
                  type="text"
                  placeholder="a succulent"
                  className="createrequest-box"
                /> 
              </>
              }
          <p className="request-label">add a brief description:</p>
            <input
              prompt={values.description}
              onChange={handleDescriptionChange}
              type="text"
              placeholder="include specifications such as number, size, and more"
              className="createrequest-box"
            />
          <p className="request-label">type of request:</p>
            <select
              prompt={values.type}
              onChange={handleTypeChange}
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
              onChange={handleTimeChange}
            >
              <option value="select"></option>
              <option value="hour">within 1 hour</option>
              <option value="day">within 1 day</option>
              <option value="week">within 1 week</option>
              <option value="weeks">within 2 weeks</option>
              <option value="month">within 1 month</option>
            </select>
          {values.item !== "" && values.description !== "" && values.type !== "" && values.time !== "" ? (
            <button
              type="submit"
              className="createrequest-submit"
              value="Submit"
              style={{backgroundColor: "var(--green)",}}
              onClick={handleSubmit}
            >
              <Link to="/requests/" className="edit-link" userId={props.userId}>
                submit
              </Link> 
            </button>
          ) : (
            <button
              type="submit"
              className="createrequest-submit"
              value="Submit"
              style={{backgroundColor: "var(--green)",}}
            >
              submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export { CreateRequest };
