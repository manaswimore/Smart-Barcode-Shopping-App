const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/scan", require("./routes/scan"));
app.use("/api/bill", require("./routes/bill"));

app.get("/", (req, res) => {
  res.send("Self Billing API Running");
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  })
  .catch(err => console.log(err));
