const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CRM API Running");
});
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;