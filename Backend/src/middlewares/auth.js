const jwt = require("jsonwebtoken")
const User= require("../models/user.model")
  const userAuth=(async (req, res, next)=>{
   try {
     const { token } = req.cookies
     if (!token) return res.status(401).send("Please Login to access the app..")
     const decodedData = await jwt.verify(token, process.env.MY_SECRET)

     const { _id } = decodedData
     const user = await User.findById(_id)
     if (!user) throw new Error("User not found!!")
     req.user = user
     next()
   } catch (error) {
    res.status(400).send("ERROR: "+error.message)
   }
  })

  module.exports={ userAuth}