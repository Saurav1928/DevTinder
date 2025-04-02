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
    const { membershipType } = req.body
    const { firstName, lastName, emailId } = req.user

    if (!membershipType) {
      return res.status(400).json({ msg: "Membership type is required" })
    }

    const orderNotes = {
      firstName: firstName || "",
      lastName: lastName || "",
      emailId: emailId || "",
      membershipType: membershipType
    }

    console.log("Creating order with notes:", orderNotes);

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: orderNotes
    });

    console.log("Order created:", order);

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      currency: order.currency,
      notes: order.notes, // Store the notes from the order directly
      receipt: order.receipt,
      status: order.status,
      amount: order.amount,
    })

    const savedPayment = await payment.save()
    // console.log("Payment saved:", savedPayment._id);
    console.log("Saved payment:", payment)
    return res.json({
      ...savedPayment.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res
      .status(500)
      .json({ msg: error?.message || "Error in creating payment" });
  }
});
// here in below "/payment/webhook" there is no need of userAUth because this api is going to be hit by razorpay and not by the user
// so no need of userAuth middleware here
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("Webhook called..")
    const webHookSignature = req.get("X-Razorpay-Signature");
    console.log("Webhook sign : ", webHookSignature)
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webHookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    )
    if (!isWebhookValid) {
      console.log("Webhook sign :", webHookSignature)
      return res.status(500).json({ msg: "Webhook signature is invalid...." })
    }

    // webhook sign is valid

    const paymentDetails = req.body.payload.payment.entity
    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    })
    // so updated payement status in DB
    payment.status = paymentDetails.status
    payment.randomField = "Random field"
    await payment.save()
    // update the user as premium
    const user = await User.findOne({ _id: payment.userId })
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save()
   
    // return success response to razorpay - if we wont return then infinte
    return res.json({ msg: "Webhook received successfully..." })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
})

module.exports = paymentRouter


// 