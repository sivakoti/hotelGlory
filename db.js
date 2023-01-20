const mongoose = require("mongoose");

var url =  process.env.DB_URL || 'mongodb://localhost:27017/SAD_Project';

mongoose.connect(url ,{useUnifiedTopology : true, useNewUrlParser: true})

var connect = mongoose.connection

connect.on("error",() => {
    console.log("Error in connection")
})

connect.on("connected",() => {
    console.log("MongoDB connected")
})

module.exports = mongoose