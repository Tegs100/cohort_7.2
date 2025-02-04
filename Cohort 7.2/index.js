const express = require("express");
const userRoute = require("./route/user.route");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());//.use is a method used to get information posted from the frontend.//Middleware is a function that actually runs before any other thing runs.


mongoose.connect("mongodb+srv://********:********@axiacohort7.wdev4.mongodb.net/cohort7?retryWrites=true&w=majority&appName=AxiaCohort7")
.then(() => {
  console.log("connected to database");
})
.catch(() => {
  console.log("Something went wrong");
});

// get request
app.use(userRoute);


app.listen(5000, () => {
  console.log("app is running");
});


