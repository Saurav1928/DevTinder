const express= require("express");
const requestRouter= express.Router();
const { userAuth } = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", userAuth, (req, res)=>{
    // console.log("Send a connection request!")
    res.send(req.user.firstName + " sent a connection request....");
  })
  module.exports= requestRouter
  