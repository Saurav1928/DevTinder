const express = require("express")
const app = express()
app.get("/user", (req, res)=>{
    res.send({
        firstName:"Saurav",
        lastName:"Farkade"
    })
})
app.post("/user",(req, res)=>{
    res.send({
        msg:"Data Saved successfully to DB!!"
    })
})
app.use("/user", (req, res)=>{
    res.send("Other than Get and Post requests!!!")
})
app.listen(7000, console.log("App is running at http://localhost:7000 !!"))
