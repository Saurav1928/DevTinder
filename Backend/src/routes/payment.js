const express = require("express")
const { userAuth } = require("../middlewares/auth")
const paymentRouter = express.Router()
const razorpayInstance = require("../utils/razorpay")
const Payment = require("../models/payment.model")
const User = require("../models/user.model")
const membershipAmount = require("../utils/constant")
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils")

paymentRouter.post("/payment/createOrder", userAuth, async (req, res) => {
  try {
    // console.log("Req Body : ", req?.body?.planName)
    const { membershipType } = req?.body
    const { firstName, lastName, emailId } = req?.user
    // console.log(req?.body)
    console.log("Payment create order called for : ", member)
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType,
      },
    })

    // once order is created, save it in database
    console.log("Order : ", order)

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      currency: order.currency,
      notes: order.notes,
      receipt: order.receipt,
      status: order.status,
      amount: order.amount,
    })
    const savedPayment = await payment.save()
    // return back the order details to the frontend
    return res.json({
      ...savedPayment.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    // console.log("Error :  ", error)
    return res
      .status(500)
      .json({ msg: error?.message || "Error in creating payment..." })
  }
})
// here in below "/payment/webhook" there is no need of userAUth because this api is going to be hit by razorpay and not by the user
// so no need of userAuth middleware here
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webHookSignature = req.headers("X-Razorpay-Signature")
    if (!webHookSignature) throw new Error("Invalid webhook sign")
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webHookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    )
    if (!isWebhookValid) {
      return res.status(500).json({ msg: "Webhook signature is invalid...." })
    }

    // webhook is valid

    const paymentDetails = req.body.payload.payment.entity
    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    })
    // so updated payement status in DB
    payment.status = paymentDetails.status
    await payment.save()
    // update the user as premium
    const user = await User.findOne({ _id: payment.userId })
    user.isPremium = true

    user.membershipType = payment.notes.membershipAmount
    await user.save()
    // if (req.body.event === "payment.captured") {
    // }
    // if (req.body.event === "payment.failed") {
    // }
    // return success response to razorpay - if we wont return then infinte
    return res.json({ msg: "Webhook received successfully..." })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
})

module.exports = paymentRouter
