const express = require("express")
const { connectDB } = require("./config/database")
const app = express()
const User= require("./models/user.model")

app.post("/signup",async (req, res, next)=>{
  const userObj={
    firstName :"Rohan",
    lastName:"Farkade",
    emailId:"rohanfarkade@gmail.com",
    password:"1234"
  }
  // creating a new instance of User
  const newUser= new User(userObj)
  await newUser.save();
  res.send("User is saved to DB!!!")
})


connectDB().then((result) => {
  console.log("Successfully Connected to DB!!")
  app.listen(7000, console.log("App is running at http://localhost:7000 !!"))
}).catch((err) => {
  console.log("Failed to connect to DB!!")
});

