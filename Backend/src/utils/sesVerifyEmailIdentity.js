const { VerifyEmailIdentityCommand } = require("@aws-sdk/client-ses")
const { sesClient } = require("./sesClient.js")
const checkVerificationStatus = require("./sesEmailCheckVerified.js")

const createVerifyEmailIdentityCommand = (emailAddress) => {
  return new VerifyEmailIdentityCommand({ EmailAddress: emailAddress })
}

const run = async (email) => {
  try {
    const VerificationStatus = await checkVerificationStatus(email)
    if (VerificationStatus === "Success") {
      console.log("Email is already verified.")
      return "Email is already verified."
    } else if (!VerificationStatus) {
      console.log("Failed to retrieve verification status.")
      return "Error checking verification status."
    }

    console.log("Email is not verified. Verifying..")
    const verifyEmailIdentityCommand = createVerifyEmailIdentityCommand(email)
    return await sesClient.send(verifyEmailIdentityCommand)
  } catch (err) {
    console.log("Failed to verify email identity.", err)
    return err
  }
}

module.exports = { run }
