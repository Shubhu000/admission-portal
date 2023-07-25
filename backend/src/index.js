require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(path.join(__dirname, "../uploads"), express.static("uploads"));
app.use(
  cors({
    origin: ["https://admission-portal-three.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
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
