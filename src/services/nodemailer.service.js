const nodemailer = require("nodemailer");
const config = require("../config");
const fs = require("fs");
const path = require("path");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.gmailAddress,
    pass: config.gmailKey,
  },
});
/**
 *
 * @param {String} name
 * @param {String} email
 */
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "template.html"),
  "utf8"
);
// console.log(emailTemplate);
async function mailSender(name, email,message) {
  const emailContent = emailTemplate.replace("{{name}}", name);
  const senderResponse = await transporter.sendMail({
    from: config.gmailAddress,
    to: email,
    subject: "Thank you for cotacting us!",
    text: "Thank you for reaching us!",
    html: emailContent,
  });
  const recieverMail = await transporter.sendMail({
    from: config.gmailAddress,
    to: config.recieverMail,
    subject: "Requested a query",
    text: "Some one requested a query",
    html: `name :${name} email:${email}, message:${message}`,
  });

  console.log("Message sent: %s", senderResponse.response);
  console.log("Message sent: %s", recieverMail.response);
}

module.exports = { mailSender };
