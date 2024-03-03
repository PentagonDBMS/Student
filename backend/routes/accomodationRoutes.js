const express = require("express");
//extract event from database
const router = express.Router();
const supabase = require("../db");
const auth = require("./auth");
const { body, validationResult } = require("express-validator");
const {
  getAllAccomodations,
  insertAllocation,
} = require("../helper/accomodationHelper");

const { sendEmail } = require("../mailer/mailSender");

// Get all accomodations (authenticated)
router.get("/", auth, async (req, res) => {
  try {
    const accomodations = await getAllAccomodations(req.student.id);
    res.json(accomodations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/allocate/:accomodation_id", auth, async (req, res) => {
  try {
    const { accomodation_id } = req.params;
    const { id, email } = req.student;
    const allocation = await insertAllocation(id, accomodation_id);
    //send mail
    console.log("Allocation", allocation);
    
    const webite_link = `${process.env.CLIENT_URL}/accommodation`;


    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Acomodation Allocated</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Helvetica', sans-serif; background: linear-gradient(90deg, rgb(216 191 216) 0%, rgb(226 232 209) 100%);">
  <div class="container" style="background-color: #f9f9f9; padding: 50px; text-align: center; max-width: 600px; margin: 50px auto; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);">
    <h1 style="font-size: 32px; color: #333; margin-bottom: 20px; font-family: 'Georgia', serif;">Accomodation Allocated</h1>
    <h3 style="font-size: 18px; color: #666; margin-bottom: 40px; font-family: 'Georgia', serif;">Thank you for registering for our university fest! We are excited to have you join us.</h3>
    <div class="event-details" style="margin-bottom: 40px;">
        <h2 style="font-size: 24px; color: #333; margin-bottom: 20px; font-family: 'Georgia', serif;">Your Allocation ID is ${allocation.allocation_id}</h2>

    </div>
    <div class="button" style="margin-top: 20px;">
      <a href="${webite_link}" style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px; transition: background-color 0.3s ease; font-family: 'Verdana', sans-serif;">View My Accommodation</a>
    </div>
  </div>
</body>
</html>
        
    `;

    const emailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Accomodation Allocation",
      html: htmlContent,
    };
    const success = await sendEmail(emailOptions);
    if (success) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send email");
    }
    res.json(allocation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
