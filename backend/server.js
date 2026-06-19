const app = require("./app");

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const connectDatabase = require("./config/database.js");

connectDatabase();

app.listen(process.env.PORT, () =>{
    console.log(`server started at port ${process.env.PORT}`);
})
