//connecting to database
const mongoose = require("mongoose");
require('dotenv').config();
// const { MongoClient } = require("mongodb");
const url = process.env.URI
// mongoose.connect(url,
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   })
  const connectDB = async ()=>{
    try{
    const connect = await mongoose.connect(url)
    console.log("database connected");
    }catch(err)
    {
      console.log(err)
      process.exit(1);
    }
  }

// const client = new MongoClient(url);
// async function connectDB() {
//     try {
//       await client.connect();
//       await client.db('contactsBackend').collection('contactsData');
//       console.log("dbconnected");
//       // await client.close();

//     }
//     catch(err)
//     {
//       console.log(err);
//     }
//   }
// this is not giving response.. search why
module.exports = connectDB;

// client.connect()
//     .then(() =>
//         console.log("DB connected")
//     ).catch(err =>
//         console.log(err))

