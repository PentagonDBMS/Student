// Import the sendEmail function
require("dotenv").config();
const { sendEmail } = require("./mailer/mailSender");

console.log(process.env.EMAIL_USERNAME);
// Define email options for testing

webite_link = "https://www.google.com";
htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Event Registration</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Helvetica', sans-serif; background: linear-gradient(90deg, rgb(216 191 216) 0%, rgb(226 232 209) 100%);">
  <div class="container" style="background-color: #f9f9f9; padding: 50px; text-align: center; max-width: 600px; margin: 50px auto; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);">
    <h1 style="font-size: 32px; color: #333; margin-bottom: 20px; font-family: 'Georgia', serif;">Event Registration</h1>
    <h3 style="font-size: 18px; color: #666; margin-bottom: 40px; font-family: 'Georgia', serif;">Thank you for registering for our university fest! We are excited to have you join us.</h3>
    <div class="event-details" style="margin-bottom: 40px;">
        <h2 style="font-size: 24px; color: #333; margin-bottom: 20px; font-family: 'Georgia', serif;">Event Details</h2>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event ID: 1</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Name: Event 1</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Time: 10:00 AM</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Date: 2022-12-31</p>
    </div>
    <div class="button" style="margin-top: 20px;">
      <a href="${webite_link}" style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px; transition: background-color 0.3s ease; font-family: 'Verdana', sans-serif;">Event Details</a>
    </div>
  </div>
</body>
</html>

`;

const emailOptions = {
  from: process.env.EMAIL_USERNAME,
  to: "hv13122002@gmail.com", // Replace with recipient email address
  subject: "Test Email",
  html: htmlContent,
};

// Function to test sending email
const testSendEmail = async () => {
  try {
    // Send the email
    const success = await sendEmail(emailOptions);

    if (success) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Call the function to test sending email
testSendEmail();
