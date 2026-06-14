const app = require("./app")
const connectDatabase = require("./config/database.js")

const dotenv = require("dotenv")
dotenv.config({path: "./config/config.env"})

connectDatabase();

app.listen(process.env.PORT, () =>{
    console.log(`server started at port ${process.env.PORT}`)
})
