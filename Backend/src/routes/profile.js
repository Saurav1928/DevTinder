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
    res.send(`Logged in user: ${loggedInUser}`)
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
    // console.log(loggedInUser)

    Object.keys(req.body).forEach((field) => {
      // console.log(field)
      loggedInUser[field] = req.body[field]
    })
    // console.log(loggedInUser)
    await loggedInUser.save()

    res.json({
      message: "User updated successfully!",
      updated_data: loggedInUser,
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

    res.json({
      message: "Password Updated successfully!",
      user: loggedInUser,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error Updating Password",
      error: error.message || error,
    })
  }
})

module.exports = profileRouter
