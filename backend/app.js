const express = require("express");
const app = express();
const cors = require("cors");

const auth = require("./routes/auth")
const restaurant = require("./routes/restaurant")

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", auth)
app.use("/api/v1/eat/stores", restaurant)


module.exports = app; 