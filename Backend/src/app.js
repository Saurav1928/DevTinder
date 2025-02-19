const express = require("express")
const { connectDB } = require("./config/database")
const app = express()
const User = require("./models/user.model")

app.use(express.json()) // without the path
//  get all users from DB with matching email
app.post("/signup", async (req, res, next) => {
  const data = req.body
  // console.log(newUser)
  // const userObj={
  //   firstName :"Rohan",
  //   lastName:"Farkade",
  //   emailId:"rohanfarkade@gmail.com",
  //   password:"1234"
  // }
  // // creating a new instance of User
  try {
    const existingUser = await User.findOne({ emailId: data.emailId });
    if (existingUser) {
      return res.status(400).send(`Email already exists. Please use another email.`);
    }
    const newUser = new User(data)
    await newUser.save()
    res.send(`User is saved to DB!!!`)
  } catch (error) {
    res.status(500).send(`Error Saving User! :  ${error.message}`)
  }
})

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
    const users= await User.find({});
    if(!users){
      res.status(404).send("Users not found!!")
    }
    else
    res.send(users) 

  } catch (error) {
    res.status(400).send("Something went wrong!!")
  }
})
app.patch("/user", async (req, res)=>{
  const data = req.body;
  const userId= data.userId;
  try {
    const updatedUser= await User.findByIdAndUpdate(userId, data, {runValidators:true});
    res.send("User updated Successfully!")
  } catch (error) {
    res.status(400).send(`Error Updating User : ${error.message}`)
  }
})

app.delete("/user", async (req, res)=>{
  const userId= req.body.userId;
  try {
    const user= await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully!!");
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
