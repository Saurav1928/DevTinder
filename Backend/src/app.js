const express= require("express")
const app= express();
app.use("/", (req, res)=>res.send("Home page!!"))
app.use("/test",(req, res)=> res.end("Hello from Test"));
app.use("/user",(req, res)=> res.end("Hello from User"));
app.listen(7000, console.log("App is running!!"));