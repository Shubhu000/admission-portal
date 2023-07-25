require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin : ["https://admission-portal-three.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}));
app.use("/api", router);
mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
app.listen(process.env.PORT, () =>
  console.log("Server is Running at" + process.env.PORT)
);
