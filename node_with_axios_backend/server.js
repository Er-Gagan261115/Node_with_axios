require("dotenv").config();
const express = require('express');

const connectDB = require("./config/connectingDB")
const errorHandler = require('./midddleware/errorHandler.js');

// module.exports = connectDB;
connectDB();
const app = express();
app.use(express.json());

// app.use is middleware

// It is a body parser, which parse the data received from client via post operation
app.use("/api/contacts", require("./routes/contactRoute.js"));
app.use("/api/users", require("./routes/userRoute.js"));
app.use(errorHandler);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    // run()
    console.log(`Server is running on port ${Port}`)
})


