const express = require("express")
const authRouter = express.Router()
const { validateSignUpData } = require("../utils/validation")
const bcrypt= require("bcrypt")
const User = require("../models/user.model")
const validator= require("validator")
const verifyEmail = require("../utils/sesVerifyEmailIdentity")
authRouter.post("/signup", async (req, res, next) => {
  try {
    //step 1: validate the data
    validateSignUpData(req)
    //step 2: encrypt the password
    const { firstName, lastName, emailId, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    //step 3: creating a new instance and saving to DB
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    })
    await newUser.save()
    const token = await newUser.getJWT()

    // step2 : add a token to cookie and send the resposne back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    })
    const verifiedEmail = await verifyEmail.run(emailId)

    res.send({ newUser, verifiedEmail })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body

    // Validate email format
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credentials...")
    }
    // Find user by emailId
    const user = await User.findOne({ emailId: emailId })
    if (!user) {
      console.log("No User Found...")
      throw new Error("Invalid Credentials...")
    }
    // Compare passwords
    const isPasswordCorrect = await user.validatePassword(password)
    if (isPasswordCorrect) {
      // step1 : create a jwt (its not a bad, but a good practice is to create such jwt methods in schema)
      const token = await user.getJWT()

      // step2 : add a token to cookie and send the resposne back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      })
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        about: user.about,
        gender: user.gender,
        photoUrl: user.photoUrl,
        age: user.age,
        _id: user._id,
      }
      res.send(data)
    } else {
      console.log("Wrong Pass Credentials...")
      throw new Error("Invalid Credentials...")
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token")
  res.send("Logout Successfully!!")
})
module.exports= authRouter