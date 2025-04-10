const { GetIdentityVerificationAttributesCommand } = require("@aws-sdk/client-ses")
const { sesClient } = require("./sesClient");

const checkVerificationStatus = async (emailId) => {
  const command = new GetIdentityVerificationAttributesCommand({
    Identities: [emailId],
  });

  try {
    const data = await sesClient.send(command)
    const status = data.VerificationAttributes[emailId]?.VerificationStatus;

    if (!status) {
      console.log(`Email ${emailId} not found or not verified.`)
      return {
        success: true,
        status: "NotVerified",
        message: "Email not found or not verified.",
      };
    }

    return {
      success: true,
      status: status === "Success" ? "Verified" : status,
      message: `Email verification status: ${status}`,
    };
  } catch (error) {
    console.error("Error checking email verification status", error)
    return {
      success: false,
      status: "Error",
      message: "Error checking verification status.",
      error: error.message || error,
    };
  }
};

module.exports = checkVerificationStatus
