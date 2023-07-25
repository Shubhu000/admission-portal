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

app.get("/", (req, res) => {
  res.send("Server is running!");
});

mongoose
  .connect("mongodb+srv://shubhudamania00:ySwPMUnjiirpBh7t@full-stack.zlwl6tk.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
app.listen(5000, () =>
  console.log("Server is Running at 5000")
);
