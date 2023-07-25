const mongoose = require("mongoose");
const ClerkSchema = new mongoose.Schema(
  {
    name: String,
    geder: String,
    dob: Date,
    email: String,
    phone: String,
    secretId: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clerk", ClerkSchema);
