const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URL) 
    .then((con) => {
        console.log(`MongoDB connected with host ${con.connection.host}`);
    })
    .catch((err) => {
        console.error(`Database connection error: ${err.message}`);
        process.exit(1); 
    });
}

module.exports = connectDatabase;
