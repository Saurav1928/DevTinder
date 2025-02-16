const express = require("express")
const app = express()
app.use(
  "/user",
  (req, res, next) => {
    console.log("Hello from 1st req handler")
    // res.send("1st response!!")
    next()
    console.log("end of 1st")
  },
 [ (req, res, next) => {
    console.log("Hello from 2nd req handler")
    // res.send("2nd response!!")
    next()
    console.log("end of 2nd")
  },
  (req, res, next) => {
    console.log("Hello from 3rd req handler")
    // res.send("3rd response!!")
    next()
    console.log("end of 3rd")
  }],
  (req, res, next) => {
    console.log("Hello from 4th req handler")
    res.send("4th response!!")
    // next()
    // console.log("end of 4th")
  }
)
app.listen(7000, console.log("App is running at http://localhost:7000 !!"))
