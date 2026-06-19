const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth")

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", auth)
module.exports = app; 