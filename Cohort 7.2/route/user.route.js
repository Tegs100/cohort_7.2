const express = require("express");
const route = express.Router();
const {createUser, getAllusers, deleteUser, updateUser, getOneUser, loginUser} = require("../controller/user.controller")

//CRUD operators: C - Create, R - Read, U - Update, D - Delete
route.post("/user", createUser);
route.get("/user", getAllusers);
route.delete("/user", deleteUser);
route.put("/user", updateUser);
route.get("/user/:id", getOneUser);
route.post("/user/login", loginUser)



module.exports = route;