import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../utilities.css";
import "./RequestMatch.css";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let j = 0;

const initialFulfillValues = {
  fulfiller: "",
  rating: "",
};

function Box(props) {
  const [requests, setRequests] = useState([]);
  const [PopUp, setPopUp] = useState(false);
  const [fulfillers, setFulfillers] = useState([]);
  const [userPopUp, setUserPopUp] = useState(false);
  const [ratingPopUp, setRatingPopUp] = useState(false);
  const [fulfillValues, setFulfillValues] = useState(initialFulfillValues);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => {
    setPopUp(true);
    //console.log("opened first");
  };
  const handleUserClose = () => {
    setUserPopUp(false);
  };
  const handleUserOpen = () => {
    setUserPopUp(true);
  };
  const handleRatingOpen = () => {
    setRatingPopUp(true);
  };
  const handleRatingClose = () => {
    setRatingPopUp(false);
  };

  let fulfillerUsernames = [];
  useEffect(() => {
    // document.title = "request matches";
    get("/api/requests", { creator: props.userId }).then((requestObjs) => {
      setRequests(requestObjs);
    });
    if (props.fulfilled && props.fulfilled.length !== 0) {
      for (let ind = 0; ind < props.fulfilled.length; ind++) {
        get("/api/user", { userid: props.fulfilled[ind] }).then((userObj) => {
          setFulfillers((oldArray) => [...oldArray, userObj]);
        });
      }
    }
  }, []);

  const handleActualResolve = (event) => {
    event.preventDefault();
    handleRatingOpen();
    /*let done = false;
    let i = 0;
    while (!done && i < requests.length) {
      if (
        requests[i].name === props.item &&
        requests[i].description === props.description &&
        requests[i].type === props.type
      ) {
        done = true;
      } else {
        i++;
      }
    }

    if (i < requests.length) {
      requests.splice(i, 1);
      const body = {
        creator: props.creator,
        name: props.item,
        description: props.description,
        time: props.time,
        type: props.type,
      };
      post("/api/deleterequest", body).then((request) => {
        console.log("request", request);
      });
    }*/
  };

  const handleResolve = (event) => {
    //this fn actually handles delete, not resolve
    event.preventDefault();

    let done = false;
    let i = 0;
    while (!done && i < requests.length) {
      if (
        requests[i].name === props.item &&
        requests[i].description === props.description &&
        requests[i].type === props.type
      ) {
        done = true;
      } else {
        i++;
      }
    }

    if (i < requests.length) {
      requests.splice(i, 1);
      const body = {
        creator: props.creator,
        name: props.item,
        description: props.description,
        time: props.time,
        type: props.type,
      };
      post("/api/deleterequest", body).then((request) => {
        console.log("request", request);
      });
    }
  };

  const handleSubmitRating = (event) => {
    //event.preventDefault();
    console.log("props", props);
    console.log("values", fulfillValues);
    if (fulfillValues.fulfiller !== "" && fulfillValues.rating !== "") {
      event.preventDefault();
      const body = { userid: fulfillValues.fulfiller, newrating: parseInt(fulfillValues.rating) };
      post("/api/updateRating", body).then((result) => {
        setFulfillValues(initialFulfillValues);
        let done = false;
        let i = 0;
        while (!done && i < requests.length) {
          if (
            requests[i].name === props.item &&
            requests[i].description === props.description &&
            requests[i].type === props.type
          ) {
            done = true;
          } else {
            i++;
          }
        }

        if (i < requests.length) {
          requests.splice(i, 1);
          const body = {
            creator: props.creator,
            name: props.item,
            description: props.description,
            time: props.time,
            type: props.type,
          };
          post("/api/deleterequest", body).then((request) => {
            console.log("request", request);
          });
        }
        //handleRatingClose();
        //handleUserClose();
        navigate("/requests/match");
      });
    }
  };

  const handleFulfillerChange = (event) => {
    const prompt = event.target.value;
    setFulfillValues({ ...fulfillValues, fulfiller: prompt });
    //setFulfiller(prompt);
    console.log("values", fulfillValues);
  };

  const handleRatingChange = (event) => {
    const prompt = event.target.value;
    setFulfillValues({ ...fulfillValues, rating: prompt });
    console.log("values", fulfillValues);
  };

  fulfillerUsernames = fulfillers.map((x) => (
    <>
      <button
        className="requestmatch-resolve"
        style={{
          backgroundColor: "var(--white)",
          fontWeight: "bold",
          width: "auto",
          margin: "5px",
        }}
        onClick={handleUserOpen}
      >
        {"@" + x.username}
      </button>
      <Modal className="modal" isOpen={userPopUp}>
        <button className="modal-close" onClick={handleUserClose}>
          ✘
        </button>
        <div className="modal-content">
          {x && (
            <div>
              <p className="modal-title">{"@" + x.username}</p>
              <p>
                {" "}
                rating:{" "}
                {x.ratings.length === 0
                  ? "no ratings yet!"
                  : (x.ratings.reduce((a, b) => a + b, 0) / x.ratings.length)
                      .toFixed(1)
                      .toString() + "/5.0"}{" "}
              </p>
              <p> name: {x.name}</p>
              <p>{x.contactMethod1 + ": " + x.contactDetails1}</p>
              <p> {x.contactMethod2 + ": " + x.contactDetails2} </p>
              <p> location: {x.location}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  ));
  //console.log(fulfillerUsernames);
  j = (j + 1) % colors.length;

  let number = "1";
  if (props.time === "weeks") {
    number = "2";
  }
  let tradeInfo = props.type + " within " + number + " " + props.time;
  return (
    <div
      className="fulfill-item-box"
      style={{ backgroundColor: colors[props.index % colors.length] }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          {!props.fulfilled || props.fulfilled.length === 0 ? (
            <>
              <b>waiting to be fulfilled...</b>
            </>
          ) : (
            <>
              <b>your request has been fulfilled!</b>
            </>
          )}
          <br />
          <br />
          <br />
          {tradeInfo}
        </div>
        <div className="fulfill-item-box-back">
          <b>item:</b> {props.item} <br />
          <b>description:</b> {props.description} <br />
          <br />
          <br />
          {!props.fulfilled || props.fulfilled.length === 0 ? (
            <>
              <b>waiting to be fulfilled...</b>
              <br />
              <br />
              <br />
              <button
                type="resolve"
                className="requestmatch-resolve"
                value="Resolve"
                style={{
                  backgroundColor: "#E5E5E5",
                }}
                onClick={handleResolve}
              >
                delete
              </button>
            </>
          ) : (
            <>
              <button
                className="requestmatch-resolve"
                style={{ backgroundColor: "var(--white)", fontWeight: "bold", width: "auto" }}
                onClick={handleOpen}
              >
                see who has your item
              </button>
              <Modal className="modal" isOpen={PopUp} ariaHideApp={false}>
                <div
                  style={{
                    backgroundColor: colors[props.index % colors.length],
                    borderRadius: "24px",
                  }}
                >
                  <button className="modal-close" onClick={handleClose}>
                    ✘
                  </button>
                  <div className="modal-content" style={{ fontStyle: "italic" }}>
                    {fulfillerUsernames}
                    <br />
                    <br />
                    <br />
                    <button
                      type="resolve"
                      className="requestmatch-resolve"
                      value="Resolve"
                      style={{
                        backgroundColor: "#E5E5E5",
                      }}
                      onClick={handleActualResolve}
                    >
                      resolve
                    </button>
                    <Modal className="modal" isOpen={ratingPopUp} ariaHideApp={false}>
                      <button className="modal-close" onClick={handleRatingClose}>
                        ✘
                      </button>
                      <div className="modal-content">
                        <form>
                          who fulfilled your request?{" "}
                          <select
                            prompt={fulfillValues.fulfiller}
                            onChange={handleFulfillerChange}
                            name="fulfiller"
                            className="createrequest-box"
                            style={{ backgroundColor: "var(--purple)" }}
                          >
                            <option key={""} value={""}></option>
                            {fulfillers.map((x) => (
                              <option key={x.username} value={x._id}>
                                {x.username}
                              </option>
                            ))}
                          </select>
                          please rate your experience with this user:
                          <select
                            prompt={fulfillValues.rating}
                            onChange={handleRatingChange}
                            name="rating"
                            className="createrequest-box"
                            style={{ backgroundColor: "var(--pink)" }}
                          >
                            <option value=""></option>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="createrequest-submit"
                            value="Submit"
                            style={{ backgroundColor: "var(--green)" }}
                            onClick={handleSubmitRating}
                          >
                            submit feedback
                          </button>
                          <br />
                        </form>
                      </div>
                    </Modal>
                    <br />
                    <button
                      type="resolve"
                      className="requestmatch-resolve"
                      value="Resolve"
                      style={{
                        backgroundColor: "#E5E5E5",
                      }}
                      onClick={handleResolve}
                    >
                      delete
                    </button>
                    <br />
                  </div>
                </div>
              </Modal>
            </>
          )}
          {/*<br />
          <br />
          <br />
          <button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            style={{
              backgroundColor: "#E5E5E5",
            }}
            onClick={handleResolve}
          >
            delete
          </button>*/}
        </div>
      </div>
    </div>
  );
}

function FulfillBox(props) {
  const [reqCreator, setReqCreator] = useState();
  const [PopUp, setPopUp] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  useEffect(() => {
    get("/api/user", { userid: props.creator }).then((userObj) => {
      setReqCreator(userObj);
    });
  }, []);

  const handleUnfulfill = (event) => {
    event.preventDefault();
    const body = { reqId: props.reqId, fulfillerId: props.userId };
    post("/api/unfulfill", body).then((result) => {
      console.log("result", result);
    });
  };

  //i = (i + 1) % colors.length;
  let number = "1";
  if (props.time === "weeks") {
    number = "2";
  }
  let tradeInfo = props.type + " within " + number + " " + props.time;
  return (
    <div
      className="fulfill-item-box"
      style={{ backgroundColor: colors[props.index % colors.length] }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          {/* front side */}
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          <b style={{ textDecoration: "underline" }}>
            {!reqCreator ? "" : "@" + reqCreator.username}
          </b>
          <br />
          <br />
          <br />
          {tradeInfo}
          <br />
        </div>
        <div className="fulfill-item-box-back">
          {/* back side */}
          <b>item:</b> {props.item} <br />
          <b>description:</b> {props.description} <br />
          <br />
          {/* <b>{props.creator}</b> */}
          <br />
          <br />
          <button
            className="requestmatch-resolve"
            style={{ backgroundColor: "var(--white)", fontWeight: "bold", width: "auto" }}
            onClick={handleOpen}
          >
            {!reqCreator ? "" : "@" + reqCreator.username}
          </button>
          <Modal className="modal" isOpen={PopUp} ariaHideApp={false}>
            <div
              style={{ backgroundColor: colors[props.index % colors.length], borderRadius: "24px" }}
            >
              <button className="modal-close" onClick={handleClose}>
                ✘
              </button>
              <div className="modal-content">
                {reqCreator && (
                  <div>
                    <p className="modal-title">{"@" + reqCreator.username}</p>
                    <p>
                      {" "}
                      rating:{" "}
                      {reqCreator.ratings.length === 0
                        ? "no ratings yet!"
                        : (
                            reqCreator.ratings.reduce((a, b) => a + b, 0) /
                            reqCreator.ratings.length
                          )
                            .toFixed(1)
                            .toString() + "/5.0"}{" "}
                    </p>
                    <p> name: {reqCreator.name}</p>
                    <p>{reqCreator.contactMethod1 + ": " + reqCreator.contactDetails1}</p>
                    <p> {reqCreator.contactMethod2 + ": " + reqCreator.contactDetails2} </p>
                    <p> location: {reqCreator.location}</p>
                  </div>
                )}
              </div>
              <br />
            </div>
          </Modal>
          <br />
          <br />
          <button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            onClick={handleUnfulfill}
          >
            unfulfill
          </button>
        </div>
      </div>
    </div>
  );
}

const RequestMatch = (props) => {
  if (!props.userId) {
    return (
      <div className="requests-container requests-item">log in to view your request matches!</div>
    );
  }

  const [user, setUser] = useState();
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      get("/api/requests", { creator: props.userId }).then((requestObjs) => {
        setRequests(requestObjs);
      });
      get("/api/allrequests", {}).then((requestObjs) => {
        setAllRequests(requestObjs);
      });
    });
  }, [props.userId, requests]);

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
        enter all account info before viewing matches!
      </div>
    );
  }

  let requestsList = null;
  const hasRequests = requests.length !== 0;
  if (hasRequests) {
    requestsList = requests.map((requestObj, i) => (
      <Box
        key={`Box_${requestObj._id}`}
        creator={requestObj.creator}
        item={requestObj.name}
        description={requestObj.description}
        type={requestObj.type}
        time={requestObj.time}
        userId={props.userId}
        index={i}
        fulfilled={requestObj.fulfilled}
      />
    ));
  } else {
    requestsList = (
      <div style={{ paddingLeft: "10px", fontStyle: "italic" }}>
        <br />
        no requests!
      </div>
    );
  }
  let fulfillsList = [];
  let fulfillsList2 = [];
  if (allRequests.length !== 0) {
    for (let ind = 0; ind < allRequests.length; ind++) {
      if (allRequests[ind].fulfilled.includes(props.userId)) {
        fulfillsList.push(allRequests[ind]);
      }
    }
  }
  if (fulfillsList.length !== 0) {
    fulfillsList2 = fulfillsList.map((requestObj, i) => (
      <FulfillBox
        key={`Box_${requestObj._id}`}
        item={requestObj.name}
        creator={requestObj.creator}
        time={requestObj.time}
        type={requestObj.type}
        index={i}
        description={requestObj.description}
        reqId={requestObj._id}
        userId={props.userId}
      />
    ));
  } else {
    fulfillsList2 = <div>you have not fulfilled any requests!</div>;
  }

  return (
    <>
      <div style={{ padding: "0px 50px" }}>
        <p className="page-title" style={{ marginTop: "-0.1%" }}>
          request matches
        </p>
        <br />
        <p className="requestmatch-subtitle2">items you requested</p>
        <div className="requestmatch-container">{requestsList}</div>
        <p className="requestmatch-subtitle">items you fulfilled</p>
        <div className="requestmatch-container">{fulfillsList2}</div>
      </div>
    </>
  );
};

export default RequestMatch;
