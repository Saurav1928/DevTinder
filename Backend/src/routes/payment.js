const express = require("express")
const { userAuth } = require("../middlewares/auth")
const paymentRouter= express.Router();
const razorpayInstance= require("../utils/razorpay")
const Payment= require("../models/payment.model")
const membershipAmount = require("../utils/constant")
paymentRouter.post("/payment/createOrder", userAuth, async (req, res)=>{
    try {
        // console.log("Req Body : ", req?.body?.planName)
        const {membershipType}= req.body
        const {firstName, lastName, emailId}= req.user
      const order= await  razorpayInstance.orders.create({
            "amount": membershipAmount[membershipType]*100,
            "currency": "INR",
            "receipt": "receipt#1",
            "notes": {
             firstName, lastName, emailId, membershipType
            }
          })

          // once order is created, save it in database
        // console.log("Order : ", order);

          const payment= new Payment({
            userId:req.user._id,
            orderId:order.id,
            currency:order.currency,
            notes:order.notes,
            receipt:order.receipt,
            status:order.status,
            amount : order.amount
          })
      const savedPayment=    await payment.save();
          // return back the order details to the frontend
          return res.json({... savedPayment.toJSON(), keyId:process.env.RAZORPAY_KEY_ID});
    } catch (error) {
        console.log("Error in razorpay : ", error)
    }
})

module.exports= paymentRouter