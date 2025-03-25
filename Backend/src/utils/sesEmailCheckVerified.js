const { GetIdentityVerificationAttributesCommand } = require("@aws-sdk/client-ses")
const { sesClient } = require("./sesClient")

const checkVerificationStatus = async (emailId) => {
  const command = new GetIdentityVerificationAttributesCommand({
    Identities: [emailId],
  })
  try {
    const data = await sesClient.send(command)
    const status = data.VerificationAttributes[emailId]?.VerificationStatus
    if (!status) {
      console.log(`Email ${emailId} not found or not verified.`)
      return "NotVerified"
    }
    return status
  } catch (error) {
    console.error("Error checking email verification status", error)
    return null
  }
}

module.exports = checkVerificationStatus
