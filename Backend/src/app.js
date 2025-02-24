const express = require("express")
const { connectDB } = require("./config/database")
const app = express()
const cookieParser = require("cookie-parser")

app.use(express.json()) // without the path
app.use(cookieParser())
//  get all users from DB with matching email

const authRouter = require("./routes/auth")
const profileROuter = require("./routes/profile")
const requestRouter = require("./routes/request")
const { userRouter } = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileROuter)
app.use("/", requestRouter)
app.use("/", userRouter)
connectDB()
  .then(() => {
    console.log("Successfully Connected to DB!!")
    app.listen(7000, console.log("App is running at http://localhost:7000 !!"))
  })
  .catch((err) => {
    console.log("Failed to connect to DB!!")
  })
