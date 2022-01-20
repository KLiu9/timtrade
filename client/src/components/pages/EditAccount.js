import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get } from "../../utilities";
import { post } from "../../utilities";

import "../../utilities.css";
import "./Account.css";
import "./EditAccount.css";

const EditAccount = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (props.userId !== undefined) {
      get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }
  }, [props.userId])
  if (!user) {
    return <div className="u-margin">loading...</div>;
  }

  const handleKerbChange = (event) => {
    const prompt = event.target.value;
    setUser({ ...user, kerb: prompt });
  };

  const handleNameChange = (event) => {
    const prompt = event.target.value;
    setUser({ ...user, name: prompt });
  };

  const handleLocChange = (event) => {
    const prompt = event.target.value;
    setUser({ ...user, location: prompt });
  };

  const handleContactMethod1Change = (event) => {
    const prompt = event.target.value;
    setUser({ ...user, contactMethod1: prompt });
  };

  const handleContactDetails1Change = (event) => {
    const prompt = event.target.value;
    setUser({ ...user, contactDetails1: prompt });
  };

  const handleContactMethod2Change = (event) => {
    const prompt = event.target.value;
    setUser({ ...user, contactMethod2: prompt });
  };

  const handleContactDetails2Change = (event) => {
    const prompt = event.target.value;
    setUser({ ...user, contactDetails2: prompt });
  };

  const handleAccountSubmit = (event) => {
    event.preventDefault();
    console.log("user before submit", user);
    // const body = { creator: props.userId, name: values.item, description: values.description, type: values.type, time: values.time };
    const body = { _id: props.userId, content: user };
    post("/api/updateUserInfo", body).then((result) => {
      console.log("result", result);
    });
    setUser(user);
    navigate("/account/");
  };

  let id = user._id;
  console.log(user);
  user.name = user.name.toLowerCase();
  const body = { _id: props.userId, content: user };
  post("/api/updateUserInfo", body);
  return (
    <div className="editaccount-container" style={{ padding: "0px 50px" }}>
      <div>
        <div className="user-box">
          <div className="user-title">{user.name}</div>
          <div className="email-title">{user.email}</div>
        </div>
        <form>
          <div className="accountinfo-container">
            <div className="spacing">
              <div className="accountinfo-label">name:</div>
              <input
                placeholder={user.name}
                onChange={handleNameChange}
                prompt={user.name}
                type="text"
                className="editprofile-box"
              ></input>
            </div>

            <div className="spacing">
              <div className="accountinfo-label">kerb:</div>
              <input
                prompt={user.kerb}
                onChange={handleKerbChange}
                placeholder={user.kerb !== "" ? user.kerb : "beavertim"}
                type="text"
                className="editprofile-box"
              />
            </div>

            <div className="spacing">
              <div className="accountinfo-label">preferred contact:</div>
              <select
                prompt={user.contactMethod1}
                onChange={handleContactMethod1Change}
                className="editprofile-box"
              >
                <option value={user.contactMethod1}>{user.contactMethod1}</option>
                {user.contactMethod1 !== "phone" && (
                  <>
                    <option value="phone">phone</option>
                  </>
                )}
                {user.contactMethod1 !== "email" && (
                  <>
                    <option value="email">email</option>
                  </>
                )}
                {user.contactMethod1 !== "messenger" && (
                  <>
                    <option value="messenger">messenger</option>
                  </>
                )}
                {user.contactMethod1 !== "instagram" && (
                  <>
                    <option value="instagram">instagram</option>
                  </>
                )}
                {user.contactMethod1 !== "discord" && (
                  <>
                    <option value="discord">discord</option>
                  </>
                )}
                {user.contactMethod1 !== "whatsapp" && (
                  <>
                    <option value="whatsapp">whatsapp</option>
                  </>
                )}
              </select>
            </div>
            {(user.contactMethod1 === "phone" || user.contactMethod1 === "whatsapp") && (
              <>
                <div className="spacing">
                  <div className="accountinfo-label">enter your phone number:</div>
                  <input
                    prompt={user.contactDetails1}
                    onChange={handleContactDetails1Change}
                    type="text"
                    placeholder="555-555-5555"
                    className="editprofile-box"
                  />
                </div>
              </>
            )}

            {(user.contactMethod1 === "instagram" || user.contactMethod1 === "discord") && (
              <>
                <div className="spacing">
                  <div className="accountinfo-label">enter your username:</div>
                  <input
                    prompt={user.contactDetails1}
                    onChange={handleContactDetails1Change}
                    type="text"
                    placeholder="@timbeaver"
                    className="editprofile-box"
                  />
                </div>
              </>
            )}

            {user.contactMethod1 === "email" && (
              <>
                <div className="spacing">
                  <div className="accountinfo-label">enter your email:</div>
                  <input
                    prompt={user.contactDetails1}
                    onChange={handleContactDetails1Change}
                    type="text"
                    placeholder="timbeaver@mit.edu"
                    className="editprofile-box"
                  />
                </div>
              </>
            )}

            {user.contactMethod1 === "messenger" && (
              <>
                <div className="spacing">
                  <div className="accountinfo-label">enter your facebook name:</div>
                  <input
                    prompt={user.contactDetails1}
                    onChange={handleContactDetails1Change}
                    type="text"
                    placeholder="tim beaver"
                    className="editprofile-box"
                  />
                </div>
              </>
            )}

            <div className="spacing">
              <div className="accountinfo-label">alternate contact:</div>
              <select
                prompt={user.contactMethod2}
                onChange={handleContactMethod2Change}
                className="editprofile-box"
              >
                <option value={user.contactMethod2}>{user.contactMethod2}</option>
                {user.contactMethod2 !== "phone" && (
                  <>
                    <option value="phone">phone</option>
                  </>
                )}
                {user.contactMethod2 !== "email" && (
                  <>
                    <option value="email">email</option>
                  </>
                )}
                {user.contactMethod2 !== "messenger" && (
                  <>
                    <option value="messenger">messenger</option>
                  </>
                )}
                {user.contactMethod2 !== "instagram" && (
                  <>
                    <option value="instagram">instagram</option>
                  </>
                )}
                {user.contactMethod2 !== "discord" && (
                  <>
                    <option value="discord">discord</option>
                  </>
                )}
                {user.contactMethod2 !== "whatsapp" && (
                  <>
                    <option value="whatsapp">whatsapp</option>
                  </>
                )}
              </select>
            </div>
            {(user.contactMethod2 === "phone" || user.contactMethod2 === "whatsapp") && (
              <>
                <div className="spacing">
                  <div className="accountinfo-label">enter your phone number:</div>
                  <input
                    prompt={user.contactDetails2}
                    onChange={handleContactDetails2Change}
                    type="text"
                    placeholder="555-555-5555"
                    className="editprofile-box"
                  />
                </div>
              </>
            )}

            {(user.contactMethod2 === "instagram" || user.contactMethod2 === "discord") && (
              <>
                <div className="spacing">
                  <div className="accountinfo-label">enter your username:</div>
                  <input
                    prompt={user.contactDetails2}
                    onChange={handleContactDetails2Change}
                    type="text"
                    placeholder="@timbeaver"
                    className="editprofile-box"
                  />
                </div>
              </>
            )}

            {user.contactMethod2 === "email" && (
              <>
                <div className="spacing">
                  <div className="accountinfo-label">enter your email:</div>
                  <input
                    prompt={user.contactDetails2}
                    onChange={handleContactDetails2Change}
                    type="text"
                    placeholder="timbeaver@mit.edu"
                    className="editprofile-box"
                  />
                </div>
              </>
            )}

            {user.contactMethod2 === "messenger" && (
              <>
                <div className="spacing">
                  <div className="accountinfo-label">enter your facebook name:</div>
                  <input
                    prompt={user.contactDetails2}
                    onChange={handleContactDetails2Change}
                    type="text"
                    placeholder="tim beaver"
                    className="editprofile-box"
                  />
                </div>
              </>
            )}

            <div className="spacing">
              <div className="accountinfo-label">location:</div>
              <input
                prompt={user.location}
                placeholder={user.location !== "" ? user.location : "new vassar"}
                onChange={handleLocChange}
                type="text"
                className="editprofile-box"
              ></input>
            </div>
            <div className="spacing">
              <button
                type="submit"
                className="edit-profile"
                value="Submit"
                onClick={handleAccountSubmit}
              >
                done
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
