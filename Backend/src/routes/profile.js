const express= require("express")
const profileRouter= express.Router();
const { userAuth } = require("../middlewares/auth")
profileRouter.get("/profile",userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user
      res.send(`Logged in user: ${loggedInUser}`)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })

  module.exports= profileRouter