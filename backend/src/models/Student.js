const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    stream: {
      type: String,
      enum: ["Computer", "Electrical", "Mechanical", "Automobile"],
    },
    dob: Date,
    birthPlace: String,
    geder: String,
    address: String,
    motherToungue: String,
    hscMarks: {
      type: Number,
      validate: {
        validator: (v) => v >= 65,
        message: "HSC Marks should ne above 65%",
      },
    },
    photo: String,
    agreedToTems: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
