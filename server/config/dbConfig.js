const mongoose = require("mongoose");

// connection logic
mongoose.connect(process.env.CONN_STRING);

// connecton state
const db = mongoose.connection;

db.on("connected", () => {
    console.log("db connection successful hamza");
});

db.on("error", (err) => {
    console.log("db connection failed");
    console.log(err);
    
});

module.exports = db;
