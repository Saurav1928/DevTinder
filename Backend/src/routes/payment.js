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

    // Headers in Express are case-insensitive and normalized to lowercase
    const webHookSignature = req.headers["x-razorpay-signature"]

    if (!webHookSignature) {
      console.error("Missing Razorpay signature header")
      return res.status(400).json({ msg: "Missing signature header" })
    }

    console.log("Webhook body:", JSON.stringify(req.body))
    console.log("Webhook signature:", webHookSignature)

    try {
      const isWebhookValid = validateWebhookSignature(
        JSON.stringify(req.body),
        webHookSignature,
        process.env.RAZORPAY_WEBHOOK_SECRET
      )

      if (!isWebhookValid) {
        console.error("Invalid webhook signature")
        return res.status(400).json({ msg: "Webhook signature is invalid" })
      }
    } catch (validationError) {
      console.error("Webhook validation error:", validationError)
      return res.status(400).json({ msg: "Webhook validation failed: " + validationError.message });
    }

    // Webhook sign is valid
    console.log("Webhook signature validated successfully");

    const paymentDetails = req.body.payload.payment.entity
    console.log("Payment details:", paymentDetails);

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    })

    if (!payment) {
      console.error("Payment not found for order ID:", paymentDetails.order_id)
      return res.status(404).json({ msg: "Payment record not found" })
    }

    // Update payment status in DB
    payment.status = paymentDetails.status
    await payment.save()
    console.log("Payment status updated:", payment.status)

    // Update the user as premium
    const user = await User.findOne({ _id: payment.userId })
    if (!user) {
      console.error("User not found for ID:", payment.userId)
      return res.status(404).json({ msg: "User not found" })
    }

    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save()
    console.log("User updated to premium:", user._id);
   
    // Return success response to Razorpay
    return res.status(200).json({ msg: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook error:", error)
    return res.status(500).json({ msg: error.message || "Internal server error" });
  }
})
module.exports = paymentRouter


// 