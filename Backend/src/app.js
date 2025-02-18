const express = require("express")
const { connectDB } = require("./config/database")
const app = express()
const User= require("./models/user.model")

app.use(express.json())// without the path

app.post("/signup",async (req, res, next)=>{
  const newUser= req.body;
  console.log(data)
  // const userObj={
  //   firstName :"Rohan",
  //   lastName:"Farkade",
  //   emailId:"rohanfarkade@gmail.com",
  //   password:"1234"
  // }
  // // creating a new instance of User
  try {
    const newUser= new User(data)
  await newUser.save();
  res.send(`User is saved to DB!!!`)
  } catch (error) {
    res.status(500).send("Error Saving User!")
  }
})


connectDB().then((result) => {
  console.log("Successfully Connected to DB!!")
  app.listen(7000, console.log("App is running at http://localhost:7000 !!"))
}).catch((err) => {
  console.log("Failed to connect to DB!!")
});

