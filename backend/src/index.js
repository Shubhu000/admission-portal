require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
app.listen(process.env.PORT, () =>
  console.log("Server is Running at" + process.env.PORT)
);
