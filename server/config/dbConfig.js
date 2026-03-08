const mongoose = require("mongoose");

// connection logic
mongoose.connect(process.env.CONN_STRING);

// connecton state
const db = mongoose.connection;

db.on("connected", () => {
    console.log("db connection successful hamza");
});

db.on("err", () => {
    console.log("db connection failed");
});

module.exports = db;
