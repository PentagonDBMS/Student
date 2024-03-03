const nodemailer = require("nodemailer");

const sendEmail = async (emailOptions) => {
  try {
    // SMTP configuration
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME, // Use environment variables
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Sending the email with HTML content
    let info = await transporter.sendMail(emailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendEmail };
