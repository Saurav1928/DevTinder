const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");


const createSendEmailCommand = ({ toEmail, fromEmail, body, subject }) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toEmail,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: `<h3>${body}</h3>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromEmail,
    ReplyToAddresses: [
      /* more items */
    ],
  })
}

const run = async ({ toEmail, fromEmail, body, subject }) => {
  const sendEmailCommand = createSendEmailCommand({
    toEmail: toEmail,
    fromEmail: "noreply@devmatcher.online",
    body,
    subject,
  })

  try {
    return await sesClient.send(sendEmailCommand)
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught
      return messageRejectedError
    }
    throw caught
  }
}
  
  // snippet-end:[ses.JavaScript.email.sendEmailV3]
  module.exports={ run };