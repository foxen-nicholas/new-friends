require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const bodyParser = require("body-parser")

const app = express()
require('dotenv').config()

const User = require("./routes/api/users")

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    next()
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//FIXME: switch for HEROKU
// const db = process.env.MONGODB_URI
// const uri = process.env.MONGODB_URI


//FIXME: uncomment for HEROKU
// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//FIXME: switch for HEROKU
// mongoose.connect( db, {useNewUrlParser: true, useUnifiedTopology: true } ).then((()=>console.log("Mongo is running on", process.env.MONGODB_URI))).catch(err => console.log(err))
// mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true } ).then((()=>console.log("Mongo is running on", process.env.MONGODB_URI))).catch(err => console.log(err))


const uri = process.env.MONGODB_URI

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoose.connect( uri).then((()=>console.log("Mongo is running on" ))).catch(err => console.log(err))

app.get("/", function(req, res){
    res.send("hello, World!\nServer is up and running")
})

app.use(passport.initialize())

require("./config/passport")(passport)

//setup our routes

app.use("/api/users", User)

app.listen(process.env.PORT || 3001, () => console.log(`server is running on ${process.env.PORT}`))