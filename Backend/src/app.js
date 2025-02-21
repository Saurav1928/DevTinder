const express = require("express")
const { connectDB } = require("./config/database")
const app = express()
const User = require("./models/user.model")
const { validateSignUpData } = require("./utils/validation")

const validator = require("validator")
const cookieParser = require("cookie-parser")
const { userAuth } = require("./middlewares/auth")

app.use(express.json()) // without the path
app.use(cookieParser())
//  get all users from DB with matching email
app.post("/signup", async (req, res, next) => {
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

app.post("/login", async (req, res) => {
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
    const isPasswordCorrect = await user.validatePassword(password);
    if (isPasswordCorrect) {
      // step1 : create a jwt (its not a bad, but a good practice is to create such jwt methods in schema)
      const token = await user.getJWT();
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
app.get("/profile",userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user
    res.send(`Logged in user: ${loggedInUser}`)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
app.post("/sendConnectionRequest", userAuth, (req, res)=>{
  console.log("Send a connection request!")
  res.send(req.user.firstName + " sent a connection request....");
})

connectDB()
  .then((result) => {
    console.log("Successfully Connected to DB!!")
    app.listen(7000, console.log("App is running at http://localhost:7000 !!"))
  })
  .catch((err) => {
    console.log("Failed to connect to DB!!")
  })
