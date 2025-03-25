const cron = require("node-cron")
const { subDays, startOfDay, endOfDay } = require("date-fns")
const ConnectionRequest = require("../models/connectionRequest.model")

const sendEmail = require("./sendEmail")
// every day at 8:00 AM
cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1)
    const yesterdayStart = startOfDay(yesterday)
    const yesterdayEnd = endOfDay(yesterday)
    // console.log("*****************************************************************")
    // console.log("Yesterday : ", yesterday);
    // console.log("Yesterday Start : ", yesterdayStart);
    // console.log("Yesterday End : ", yesterdayEnd);
    // there can be multiple request so it may be slow, hence we can have pagination
    const yesterdaysPendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId")
    const listOfEmails = [
        ...new Set(
            yesterdaysPendingRequests?.map((req) => req?.toUserId?.emailId)
        ),
    ]
    const nameOfSender= yesterdaysPendingRequests[0]?.fromUserId?.firstName;
    const senderEmail= yesterdaysPendingRequests[0]?.fromUserId?.emailId;
    // console.log("Pending Requests : ", yesterdaysPendingRequests[0]?.fromUserId?.firstName)
    // console.log("Pending Requests : ", yesterdaysPendingRequests[0]?.toUserId?.firstName)
    // console.log("Pending Requests from : ", yesterdaysPendingRequests.fromUserId)
    // console.log("Pending Requests to user : ", yesterdaysPendingRequests["toUserId"])

    // console.log(listOfEmails)

    // sending email in this way is good only if there are 10000 or less requests
    // if there are more requests then we need to use batch email sending, or queue 
    // we can use bee queue for this
    for (let email of listOfEmails) {
      const res = await sendEmail.run({
        fromEmail: senderEmail,
        toEmail: email,
        subject: "🚀 Pending Connection request on DevTinder!",
        body: `Hi there! There are many pending connection requests on DevMatcher (https://devmatcher.online).
        Don't miss out on exciting opportunities to collaborate and innovate.,
        Accept or Reject the request now!,`,
      })
        // console.log("Email sent to : ", email)
    }

  } catch (error) {
    console.log("Error in cron job : ", error)
  }
})
