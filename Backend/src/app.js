const express = require("express")
const { connectDB } = require("./config/database")
const app = express()
const User = require("./models/user.model")
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt")
const validator =require("validator")
app.use(express.json()) // without the path
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
    const { emailId, password } = req.body;
    console.log({emailId, password})
    // Validate email format
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credentials...");
    }

    // Find user by emailId
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      console.log("Invalid Email...")
      throw new Error("Invalid Credentials...");
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      res.status(200).json({ message: "Login Success!!" });
    } else {
      console.log("Wrong Password")
      throw new Error("Invalid Credentials...");
    }
  } catch (error) {
    
    res.status(400).json({ error:  error.message });
  }
});
app.get("/userByEmail", async (req, res) => {
  try {
    const userEmail = req.body.emailId
    const user = await User.find({ emailId: userEmail })
    if (!user) {
      res.status(404).send(`User with mail : ${userEmail} not found!!`)
    } else {
      res.send(user)
    }
  } catch (error) {
    res.status(400).send("Something went wrong!!")
  }
})
// feed api - get all users from DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) {
      res.status(404).send("Users not found!!")
    } else res.send(users)
  } catch (error) {
    res.status(400).send("Something went wrong!!")
  }
})
app.patch("/user/:userId", async (req, res) => {
  const data = req.body
  const userId = req.params?.userId

  try {
    // _id should not be updated.. so removing it from ALLOWED_UPDATES
    const ALLOWED_UPDATES = [
      "skills",
      "photoUrl",
      "gender",
      "age",
      "firstName",
      "lastName",
      "about",
    ]
    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    ) // checking if every key sent in data is allowed or not..
    if (!isAllowedUpdates) throw new Error("Updates Not Allowed!!")
    // if (data?.skills.length > 10)
    //   throw new Error("Skills cannot be more than 10")
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    })
    res.send("User updated Successfully!")
  } catch (error) {
    res.status(400).send(`Error Updating User : ${error.message}`)
  }
})

app.delete("/user", async (req, res) => {
  const userId = req.body.userId
  try {
    const user = await User.findByIdAndDelete(userId)
    res.send("User Deleted Successfully!!")
  } catch (error) {
    res.send("Error while deleting a user!!")
  }
})

connectDB()
  .then((result) => {
    console.log("Successfully Connected to DB!!")
    app.listen(7000, console.log("App is running at http://localhost:7000 !!"))
  })
  .catch((err) => {
    console.log("Failed to connect to DB!!")
  })
