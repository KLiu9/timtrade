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

router.get("/thisrequest", (req, res) => {
  Request.findById(req.query.reqId).then((request) => {
    res.send(request);
  });
});

router.get("/thislisting", (req, res) => {
  Item.findById(req.query.listId).then((listing) => {
    res.send(listing);
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
  });
});

router.get("/listingsByClaimer", (req, res) => {
  Item.find({ claimed: [req.query.claimer] }).then((items) => {
    res.send(items);
  });
});

router.get("/allListings", (req, res) => {
  Item.find({}).then((items) => {
    res.send(items);
  });
});

router.get("/unclaimedListings", (req, res) => {
  Item.find({ claimed: [] }).then((items) => {
    res.send(items);
  });
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/allUsers", (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
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
  Request.deleteOne({
    creator: req.body.creator,
    name: req.body.name,
    description: req.body.description,
    time: req.body.time,
    type: req.body.type,
  }).then((result) => {});
});

router.post("/updateUserInfo", (req, res) => {
  User.findById(req.body.content._id).then((result) => {
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

router.post("/updateRating", (req, res) => {
  User.findById(req.body.userid).then((result) => {
    result.ratings.push(req.body.newrating);
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

  newItem.save().then((listing) => res.send(listing));
});

router.post("/deleteItem", (req, res) => {
  Item.deleteOne({
    creator: req.body.creator,
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
  }).then((result) => {});
});

router.post("/updateRequest", (req, res) => {
  Request.findById(req.body.reqId).then((result) => {
    if (!result.fulfilled.includes(req.body.creatorId)) {
      result.fulfilled.push(req.body.creatorId);
    }
    result.save().then((updatedReq) => res.send(updatedReq));
  });
});

router.post("/updateListing", (req, res) => {
  Item.findById(req.body.reqId).then((result) => {
    if (!result.claimed.includes(req.body.creatorId)) {
      result.claimed.push(req.body.creatorId);
    }
    result.save().then((updatedReq) => res.send(updatedReq));
  });
});

router.post("/unfulfill", (req, res) => {
  Request.findById(req.body.reqId).then((result) => {
    for (let i = 0; i < result.fulfilled.length; i++) {
      if (result.fulfilled[i] === req.body.fulfillerId) {
        result.fulfilled.splice(i, 1);
      }
    }
    result.save().then((updatedReq) => res.send(updatedReq));
  });
});

router.post("/unclaim", (req, res) => {
  Item.findById(req.body.reqId).then((result) => {
    for (let i = 0; i < result.claimed.length; i++) {
      if (result.claimed[i] === req.body.fulfillerId) {
        result.claimed.splice(i, 1);
      }
    }
    result.save().then((updatedReq) => res.send(updatedReq));
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
