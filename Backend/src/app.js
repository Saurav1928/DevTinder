const dotenv = require("dotenv")
dotenv.config() // Make sure this is at the top before using process.env

const express = require("express")
const { connectDB } = require("./config/database")
const app = express()

const cookieParser = require("cookie-parser")
const cors = require("cors")
app.use(cors({ origin: "http://localhost:5173", credentials: true })) // whitelisting frontend domain name
app.use(express.json()) // without the path
app.use(cookieParser())

//  get all users from DB with matching email
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const { userRouter } = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

const PORT = process.env.PORT || 3000

connectDB()
  .then(() => {
    app.listen(
      PORT,
      console.log(`App is running at http://localhost:${PORT} !!`)
    )
  })
  .catch((err) => {
    console.log("Failed to connect to DB!!")
  })
