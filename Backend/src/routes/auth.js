const express = require("express")
const authRouter = express.Router()
const { validateSignUpData } = require("../utils/validation")
const bcrypt= require("bcrypt")
const User = require("../models/user.model")
const validator= require("validator")
authRouter.post("/signup", async (req, res, next) => {
  try {
    //step 1: validate the data
    validateSignUpData(req)
    //step 2: encrypt the password
    const { firstName, lastName, emailId, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log(hashedPassword)
    //step 3: creating a new instance and saving to DB
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    })
    await newUser.save()
    console.log("Hiii")
    res.send("Signed Up Success!!")
  } catch (error) {
    res.status(500).send(`Error in User SignUp ! :  ${error.message}`)
  }
})

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body
    // console.log({ emailId, password })
    // Validate email format
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credentials...")
    }
    // Find user by emailId
    const user = await User.findOne({ emailId: emailId })
    if (!user) {
      // console.log("Invalid Email...")
      throw new Error("Invalid Credentials...")
    }
    // Compare passwords
    const isPasswordCorrect = await user.validatePassword(password)
    if (isPasswordCorrect) {
      // step1 : create a jwt (its not a bad, but a good practice is to create such jwt methods in schema)
      const token = await user.getJWT()
      // console.log(token)
      // step2 : add a token to cookie and send the resposne back to the user
      res.cookie("token", token)
      res.status(200).json({ message: "Login Success!!" })
    } else {
      // console.log("Wrong Password")
      throw new Error("Invalid Credentials...")
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports= authRouter