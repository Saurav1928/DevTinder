const express = require("express")
const app = express()
// app.get("/user", (req, res)=>{
//     res.send({
//         firstName:"Saurav",
//         lastName:"Farkade"
//     })
// })
// app.post("/user",(req, res)=>{
//     res.send({
//         msg:"Data Saved successfully to DB!!"
//     })
// })
// app.use("/user", (req, res)=>{
//     res.send("Other than Get and Post requests!!!")
// })

// advance routing techniques!!
// this will work for /abc
// app.get("/abc", (req, res)=>{
//     res.send("Hello!!")
// })

// this will work for /abc, /ac => as there is ? 
// -> this makes b as optional
// app.get("/ab?c", (req, res)=>{
//     res.send("Hello!!")
// })

// this will work for /abc, /abbc, /abbbc, /ab........bc 
// like + will make b for any cnt
// app.get("/ab+c", (req, res)=>{
//     res.send("Hello!!")
// })

// this will work for /abcd, /abdsbsdjfhgjdffcd anything in 
// bw ab and cd but it should have ab at start and cd at end, pattern should match 
// app.get("/ab*cd", (req, res)=>{
//     res.send({msg:"Hello from server"})
// })


// to handle dynamic query params like id, passowrd, name etc
app.get("/user/:userId/:password/:age", (req, res)=>{
    console.log(req.params)
    res.send("Received params:")
})
// regex can also be used in routing
app.listen(7000, console.log("App is running at http://localhost:7000 !!"))
