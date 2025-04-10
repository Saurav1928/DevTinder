const { VerifyEmailIdentityCommand } = require("@aws-sdk/client-ses")
const { sesClient } = require("./sesClient.js")
const checkVerificationStatus = require("./sesEmailCheckVerified.js");

const createVerifyEmailIdentityCommand = (emailAddress) => {
  return new VerifyEmailIdentityCommand({ EmailAddress: emailAddress })
};

const run = async (email) => {
  try {
    const verificationResponse = await checkVerificationStatus(email)

    if (!verificationResponse.success) {
      return verificationResponse
    }

    if (verificationResponse.status === "Verified") {
      return {
        success: true,
        status: "Verified",
        message: "Email is already verified.",
      };
    }

    console.log("Email is not verified. Sending verification email...")

    const verifyEmailIdentityCommand = createVerifyEmailIdentityCommand(email)
    const result = await sesClient.send(verifyEmailIdentityCommand)

    return {
      success: true,
      status: "Pending",
      message: "Verification email sent.",
      result,
    };
  } catch (err) {
    console.error("Failed to verify email identity.", err)
    return {
      success: false,
      status: "Error",
      message: "Failed to verify email identity.",
      error: err.message || err,
    };
  }
};

module.exports = { run }
