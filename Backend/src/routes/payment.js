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
// paymentRouter.post("/payment/webhook", async (req, res) => {
//   try {
//     const webHookSignature = req.headers("X-Razorpay-Signature")
//     if (!webHookSignature) throw new Error("Invalid webhook sign")
//     const isWebhookValid = validateWebhookSignature(
//       JSON.stringify(req.body),
//       webHookSignature,
//       process.env.RAZORPAY_WEBHOOK_SECRET
//     )
//     if (!isWebhookValid) {
//       return res.status(500).json({ msg: "Webhook signature is invalid...." })
//     }

//     // webhook is valid

//     const paymentDetails = req.body.payload.payment.entity
//     const payment = await Payment.findOne({
//       orderId: paymentDetails.order_id,
//     })
//     // so updated payement status in DB
//     payment.status = paymentDetails.status
//     await payment.save()
//     // update the user as premium
//     const user = await User.findOne({ _id: payment.userId })
//     user.isPremium = true

//     user.membershipType = payment.notes.membershipAmount
//     await user.save()
//     // if (req.body.event === "payment.captured") {
//     // }
//     // if (req.body.event === "payment.failed") {
//     // }
//     // return success response to razorpay - if we wont return then infinte
//     return res.json({ msg: "Webhook received successfully..." })
//   } catch (error) {
//     return res.status(500).json({ msg: error.message })
//   }
// })

paymentRouter.post("/payment/webhook", bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}), async (req, res) => {
  try {
    const webHookSignature = req.headers["x-razorpay-signature"];
    if (!webHookSignature) throw new Error("Invalid webhook signature");

    const isWebhookValid = validateWebhookSignature(
      req.rawBody,
      webHookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    if (!isWebhookValid) {
      return res.status(500).json({ msg: "Webhook signature is invalid" });
    }

    // webhook is valid
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Update payment status in DB
    payment.status = paymentDetails.status;
    await payment.save();

    // Update the user to premium
    const user = await User.findById(payment.userId);
    if (!user) {
      throw new Error("User not found");
    }
       user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    // Handle different events
    const event = req.body.event;
    if (event === "payment.captured") {
      // Payment captured logic
    } else if (event === "payment.failed") {
      // Payment failed logic
    }

    // Return success response to Razorpay
    return res.json({ msg: "Webhook received successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});


module.exports = paymentRouter
