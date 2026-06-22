const app = require("./app");

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const connectDatabase = require("./config/database.js");

connectDatabase();


PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log(`Server started on PORT: ${PORT}`)
})
