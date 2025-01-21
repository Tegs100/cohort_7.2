
const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs")

// creating a user function
const createUser= async(req, res) => {
  const {password, ...others} = req.body;
  const salt = bcrypt.genSaltSync(10)
  //hashed password
  const hashedPassword = bcrypt.hashedPassword(password, salt)
  console.log(hashedPassword)
  //check user existence: By using email
  const isUser = await userModel.findOne({email: others.email});
  console.log(isUser);
  if(isUser) {
    return res.json({message: "User already exist"})
  }
  try {
  const newUser = new userModel({password: hashedPassword, ...others});
  await newUser.save();
  res.send("user created successfully.");
}
 catch (error) {
  res.send();
}
};

//login user
const loginUser = async(req, res) => {
  const {email, password} = req.body 
  //check for email and password
  if(!email || !password) {
    return res.json({message: "provide valid credentials"})
  }
  //check if user already exist
  const checkUser = await userModel.findOne({email})
  if(!checkUser) {
    return res.json({message: "user not found, please register"})
  }
  //check password
  const isPasswordValid = bcrypt.compareSync(password, checkUser.password)
  console.log(isPasswordValid);
  if(!isPasswordValid) {
    return res.json({message: "password is not valid"})
  }
  //return information to the frontend
  return res.json(checkUser);
}

//get user
const getAllusers = async(req, res) => {
  try{
  const user = await userModel.find();
  res.json(user);
  }
  catch (error) {
    res.send("Something went wrong");
  }
};

// delete user
const deleteUser = async(req, res) => {
  const {id} = req.body;
  try{
    const user = await userModel.findByIdAndDelete(id)
    res.send("user deleted successfully");
}
catch (error) {
  res.send("Something went wrong");
}
};

//update user
const updateUser = async(req, res) => {
  const {id, name, age} = req.body;
  try {
    await userModel.findByIdAndUpdate(id, {name, age}, {new: true});
    res.send("user updated successfully")
  } catch (error) {
    res.send("Something went wrong")
    
  };
};


//getoneuser
const getOneUser = async(req, res) => {
  const {id} = req.params;
  try {
  const oneUser = await userModel.findById(id);
  res.json(oneUser);
  } catch (error) {
    res.send("Something went wrong");
  }
};


module.exports = {createUser, getAllusers, deleteUser,updateUser, getOneUser, loginUser};