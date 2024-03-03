const express = require("express");
const router = express.Router();
const supabase = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const auth = require("./auth");

// Rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

// Check if student is authenticated
router.get("/check", (req, res) => {
  console.log("Student is authenticated");
  res.send("Student is authenticated");
});

// Get student
router.get("/user", auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    const { data: student, error } = await supabase
      .from("students_or_externals")
      .select("*  ")
      .eq("students_or_externals_id", studentId)
      .single();

    if (error || !student) {
      return res.status(404).json({ msg: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Signup Endpoint
router.post(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail(),
    body("password").isLength({ min: 2 }),
    body("isstudent").isBoolean(),
    body("college_name").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isstudent, college_name } = req.body;
    const emailLowercase = email.toLowerCase(); // Convert email to lowercase
    try {
      const { data: users, error: userExistsError } = await supabase
        .from("students_or_externals")
        .select("*")
        .eq("email", emailLowercase);

      if (userExistsError) {
        throw userExistsError;
      }
      // If any user is found, return an error
      if (users.length > 0) {
        return res.status(400).json({ msg: "Student already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const { data: newUser, error: newUserError } = await supabase
        .from("students_or_externals")
        .insert([
          {
            name,
            email: emailLowercase,
            password: hashedPassword,
            isstudent,
            college_name,
          },
        ])
        .select("*")
        .single();
      console.log(newUser);

      if (newUserError) throw newUserError;

      const payload = {
        student: {
          id: newUser.students_or_externals_id,
          email : newUser.email
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "5h" },
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
              maxAge: 18000000,
            })
            .json({
              studentId: newUser.students_or_externals_id,
              name: newUser.name,
              email: newUser.email,
              isstudent: newUser.isstudent,
              college_name: newUser.college_name,
            });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Login Endpoint
router.post(
  "/login",
  loginLimiter,
  [body("email").isEmail(), body("password").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const emailLowercase = email.toLowerCase(); // Convert email to lowercase

    try {
      const { data: student, error } = await supabase
        .from("students_or_externals")
        .select("*")
        .eq("email", emailLowercase)
        .single();

      if (error || !student) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        student: {
          id: student.students_or_externals_id,
          email : student.email,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "5h" },
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
              maxAge: 18000000,
            })
            .json({
              studentId: student.students_or_externals_id,
              name: student.name,
              email: student.email,
              isstudent: student.isstudent,
              college_name: student.college_name,
            });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//logout endpoint
router.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "None",
    })
    .sendStatus(200);
});

// 2. endpoint to update password, receives studentid, oldpassword, newpassword
router.post(
  "/updatepassword",
  auth,
  [
    body("oldPassword").not().isEmpty(),
    body("newPassword").isLength({ min: 2 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error", errors.array());
      return res.status(400).json({ msg: errors.array() });
    }

    const { studentid, oldPassword, newPassword } = req.body;
    try {
      const { data: student, error } = await supabase
        .from("students_or_externals")
        .select("*")
        .eq("students_or_externals_id", studentid)
        .single();

      console.log(studentid);

      if (error || !student) {
        console.log("yaha");
        console.log(student);
        console.log(error);
        return res.status(400).json({ msg: "Network Error, Please try again !!!" });
      }

      const isMatch = await bcrypt.compare(oldPassword, student.password);
      if (!isMatch) {
        console.log("match nhi kia");
        return res.status(400).json({ msg: "Incorrect Old Password" });
      }
      console.log("match kia");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const { data: updatedStudent, updateError } = await supabase
        .from("students_or_externals")
        .update({ password: hashedPassword })
        .eq("students_or_externals_id", studentid)
        .select("*")
        .single();

      console.log(updatedStudent);

      if (updateError) {
        throw updateError;
      }

      res.json({ msg: "Password Changed Successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

// router.post(
//   "/comparepassword",
//   auth,
//   [body("email").isEmail(), body("password").not().isEmpty()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log("error", errors.array());
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     const emailLowercase = email.toLowerCase(); // Convert email to lowercase

//     try {
//       const { data: student, error } = await supabase
//         .from("students_or_externals")
//         .select("*")
//         .eq("email", emailLowercase)
//         .single();

//       console.log(student);
//       console.log(error);

//       if (error || !student) {
//         return res.status(400).json({ msg: "Invalid Credentials" });
//       }

//       const isMatch = await bcrypt.compare(password, student.password);
//       if (!isMatch) {
//         console.log("Password does not match");
//         return res.status(400).json({ msg: "Password does not match" });
//       }

//       res.json({ msg: "Password match" });
//       console.log("Password match");
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );
