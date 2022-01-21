/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Item = require("./models/items");
const Request = require("./models/request");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { insertMany } = require("./models/user");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});


router.get("/requests", (req, res) => {
  Request.find({ creator: req.query.creator }).then((requests) => {
    res.send(requests);
  });
});

router.get("/allrequests", (req, res) => {
  Request.find({}).then((requests) => {
    res.send(requests);
  });
});

router.get("/listings", (req, res) => {
  Item.find({ creator: req.query.creator }).then((items) => {
    res.send(items);
    console.log("MY LISTINGS", items);
  })
})

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.post("/request", (req, res) => {
  const newRequest = new Request({
    creator: req.body.creator,
    name: req.body.content.item,
    description: req.body.content.description,
    type: req.body.content.type,
    time: req.body.content.time,
    fulfilled: [],
  });

  newRequest.save().then((request) => res.send(request));
});

router.post("/deleterequest", (req, res) => {
  /*Request.findOne({ name: req.body.name }).then((result) => {
    console.log(result);
    result.name = "NOT AN ITEM";
    result.save().then((request) => res.send(request));
  });*/
  Request.deleteOne({
    creator: req.body.creator,
    name: req.body.name,
    description: req.body.description,
    time: req.body.time,
    type: req.body.type,
  }).then((result) => {
    console.log("deleted request");
  });
});

router.post("/updateUserInfo", (req, res) => {
  User.findById(req.body.content._id).then((result) => {
    //console.log(result);
    result.name = req.body.content.name;
    result.kerb = req.body.content.kerb;
    result.username = req.body.content.username;
    result.contactMethod1 = req.body.content.contactMethod1;
    result.contactDetails1 = req.body.content.contactDetails1;
    result.contactMethod2 = req.body.content.contactMethod2;
    result.contactDetails2 = req.body.content.contactDetails2;
    result.location = req.body.content.location;
    result.save().then((newUserInfo) => res.send(newUserInfo));
  });
});

router.post("/listItem", (req, res) => {
  const newItem = new Item({
    creator: req.body.creator,
    name: req.body.content.item,
    description: req.body.content.description,
    type: req.body.content.type,
  });

  console.log("NEW LISTING", newItem);
  newItem.save().then((listing) => res.send(listing));
});

router.post("/updateRequest", (req, res) => {
  Request.findById(req.body.reqId).then((result) => {
    console.log("before:", result);
    if (!result.fulfilled.includes(req.body.creatorId)) {
      result.fulfilled.push(req.body.creatorId);
    }
    console.log("after:", result);
    result.save().then((updatedReq) => res.send(updatedReq));
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
