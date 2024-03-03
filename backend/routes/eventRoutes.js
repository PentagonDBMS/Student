const express = require("express");
//extract event from database
const router = express.Router();
const supabase = require("../db");
const auth = require("./auth");
const { body, validationResult } = require("express-validator");

const { sendEmail } = require("../mailer/mailSender");

const {
  getAllEvents,
  getAllEvents2,
  getEventsByStudentId,
  getEventsByStudentId2,
  getRegisteredEventsForParticipant,
} = require("../helper/eventHelpers");
// Get all events (authenticated)
router.get("/", auth, async (req, res) => {
  try {
    const events = await getAllEvents2(req.student.id);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get events by id (authenticated)
router.get("/:event_id", auth, async (req, res) => {
  try {
    const { event_id } = req.params;
    const events = await getEventsByStudentId2(req.student.id, event_id);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint for register in an event with a specific event_id and student_id
router.post("/participate/:event_id", auth, async (req, res) => {
  try {
    const { event_id } = req.params;
    const { id, email } = req.student;
    const { data, error } = await supabase
      .from("participants")
      .insert([{ event_id, students_or_externals_id: id }])
      .select("*")
      .single();
    if (error) {
      throw error;
    }

    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("event_id", event_id)
      .single();
    if (eventError) {
      throw eventError;
    }


    // {
  //   event_id: 13,
  //   name: 'Completed Event',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',   
  //   start_time: '2024-03-10T03:30:00',
  //   end_time: '2024-03-16T03:30:00',
  //   is_participant: true,
  //   is_volunteer: false
  // }
    const webite_link = `${process.env.CLIENT_URL}/events/${event_id}`;

    const start_time = new Date(event.start_time);
    const start_time_string = start_time.toLocaleTimeString();
    const start_date_string = start_time.toLocaleDateString();
    const htmlContent = `
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
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event ID: "${event_id}"</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Name: "${event.name}"</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Time: "${start_time_string}"</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Date : "${start_date_string}"</p>
    </div>
    <div class="button" style="margin-top: 20px;">
      <a href="${webite_link}" style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px; transition: background-color 0.3s ease; font-family: 'Verdana', sans-serif;">Event Details</a>
    </div>
  </div>
</body>
</html>



    `;

    console.log(data);
    const emailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email, // Replace with recipient email address
      subject: "Event Registration",
      html: htmlContent,
    };
    console.log(emailOptions);

    res.json({ data, event });
    const success = await sendEmail(emailOptions);

    if (success) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send mail");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Exdpoint for volunteer in an event with a specific event_id and student_id
router.post("/volunteer/:event_id", auth, async (req, res) => {
  try {
    const { event_id } = req.params;
    const { id,email } = req.student;
    const { data, error } = await supabase
      .from("volunteers")
      .insert([{ event_id, students_or_externals_id: id }])
      .select("*")
      .single();
    if (error) {
      throw error;
    }

    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("event_id", event_id)
      .single();
    if (eventError) {
      throw eventError;
    }
    const webite_link = `${process.env.CLIENT_URL}/events/${event_id}`;

    const start_time = new Date(event.start_time);
    const start_time_string = start_time.toLocaleTimeString();
    const start_date_string = start_time.toLocaleDateString();
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Event Volunteer</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Helvetica', sans-serif; background: linear-gradient(90deg, rgb(216 191 216) 0%, rgb(226 232 209) 100%);">
  <div class="container" style="background-color: #f9f9f9; padding: 50px; text-align: center; max-width: 600px; margin: 50px auto; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);">
    <h1 style="font-size: 32px; color: #333; margin-bottom: 20px; font-family: 'Georgia', serif;">Event Volunteer</h1>
    <h3 style="font-size: 18px; color: #666; margin-bottom: 40px; font-family: 'Georgia', serif;">Thank you for volunteering for our university fest! We are excited to have you join us.</h3>
    <div class="event-details" style="margin-bottom: 40px;">
        <h2 style="font-size: 24px; color: #333; margin-bottom: 20px; font-family: 'Georgia', serif;">Event Details</h2>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event ID: "${event_id}"</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Name: "${event.name}"</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Time: "${start_time_string}"</p>
        <p style="font-size: 18px; color: #666; margin-bottom: 20px; font-family: 'Verdana', sans-serif;">Event Date : "${start_date_string}"</p>
    </div>
    <div class="button" style="margin-top: 20px;">
      <a href="${webite_link}" style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px; transition: background-color 0.3s ease; font-family: 'Verdana', sans-serif;">Event Details</a>
    </div>
  </div>
</body>
</html>


    `;
    console.log(data);
    const emailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email, // Replace with recipient email address
      subject: "Event Volunteer",
      html: htmlContent,
    };

    console.log(emailOptions);

    res.json({ data, event });
    const success = await sendEmail(emailOptions);

    if (success) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send mail");
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
