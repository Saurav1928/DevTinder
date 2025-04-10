const express = require("express")
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/auth")
const bcrypt = require("bcrypt")
const {
  validateEditData,
  validateForgetPasswordData,
} = require("../utils/validation")
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user
    const { _id, firstName, lastName, about, skills, age, gender, photoUrl, isVerified } =
      loggedInUser
    res.send({ user: { _id, firstName, lastName, about, skills, age, gender, photoUrl, isVerified } })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("Invalid Edit Data...")
    }

    const loggedInUser = req.user


    Object.keys(req.body).forEach((field) => {

      loggedInUser[field] = req.body[field]
    })
    await loggedInUser.save()
    const { _id, firstName, lastName, about, skills, age, gender, photoUrl, isVerified } =
      loggedInUser
    res.json({
      message: "User updated successfully!",
      data: { _id, firstName, lastName, about, skills, age, gender, photoUrl, isVerified },
    })
  } catch (err) {
    res.status(400).json({
      message: "Error Editing Profile",
      error: err.message || err,
    })
  }
})
profileRouter.patch("/profile/forgetPassword", userAuth, async (req, res) => {
  /*
    - req(email, old pass, new pass)
    - compare the old pass and the hashed pass from db, 
    - if ok then updates the password with new password provided there
    */
  try {
    // Await the validation function
    await validateForgetPasswordData(req)

    const loggedInUser = req.user
    const { newPassword } = req.body
    const newHashedPassword = await bcrypt.hash(newPassword, 10)

    loggedInUser.password = newHashedPassword
    await loggedInUser.save()
    const { _id, firstName, lastName, about, skills, age, gender, photoUrl, isVerified } =
      loggedInUser
    res.json({
      message: "Password Updated successfully!",
      user: { _id, firstName, lastName, about, skills, age, gender, photoUrl, isVerified },
    })
  } catch (error) {
    res.status(400).json({
      message: "Error Updating Password",
      error: error.message || error,
    })
  }
})

module.exports = profileRouter
