// const express = require("express");
// const router = express.Router();
// const supabase = require("../db");
// const auth = require("./auth");
// const { body, validationResult } = require("express-validator");

// // write a function here to fetch all accommodation
// const getAllAccommodation = async () => {
//   const { data: data, error: error } = await supabase
//     .from("accommodation")
//     .select("*");
//   if (error) {
//     throw error;
//   }
//   return data;
// }

// // now use the function to get all accommodation
// router.get("/", auth, async (req, res) => {
//   try {
//     const accommodation = await getAllAccommodation();
//     res.json(accommodation);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// //function to get accommodation by id

// module.exports = router;
