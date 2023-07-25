const express = require("express");
const router = express.Router();
const Clerk = require("../models/Clerk");
const Student = require("../models/Student");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

//register clerk
router.post("/register", async (req, res) => {
  try {
    const { name, geder, dob, email, phone, secretId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClerk = new Clerk({
      name,
      geder,
      dob,
      email,
      phone,
      secretId,
      password: hashedPassword,
    });

    const result = await newClerk.save();
    const clerkData = {
      _id: result._id,
      name: result.name,
      gender: result.gender,
      dob: result.dob,
      email: result.email,
      phone: result.phone,
      secretId: result.secretId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
    res.status(200).json(clerkData);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//login clerk
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const clerk = await Clerk.findOne({ email });

    if (!clerk) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, clerk.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const clerkData = {
      _id: clerk._id,
      name: clerk.name,
      gender: clerk.geder,
      dob: clerk.dob,
      email: clerk.email,
      phone: clerk.phone,
      secretId: clerk.secretId,
      createdAt: clerk.createdAt,
      updatedAt: clerk.updatedAt,
    };

    const token = jwt.sign(
      { _id: clerk._id, email: clerk.email },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, clerk: clerkData });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//fetch all students
router.get("/dashboard", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//add new students
router.post("/add-students", upload.single("photo"), async (req, res) => {
  try {
    const studentData = req.body;
    studentData.photo = req.file.path;
    const newStudent = new Student(studentData);
    const result = await newStudent.save();
    res.status(200).json(result);
  } catch (error) {
    if (error.name === "ValidationError" && error.errors.hscMarks) {
      res.status(400).json({ error: error.errors.hscMarks.message });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

module.exports = router;
