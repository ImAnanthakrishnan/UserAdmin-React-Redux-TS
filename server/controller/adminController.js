import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const validAdmin = await User.findOne({email,is_admin:1,});

    if(validAdmin && bcryptjs.compareSync(password,validAdmin.password)){
        const {password:hashedPassword,...rest} = validAdmin._doc;
        const token = jwt.sign({id:validAdmin._id},process.env.JWT_SECRET);
        const expiryDate = new Date(Date.now() + 3600000);

        res
          .cookie("acces_token1",token,{httpOnly:true,expires:expiryDate})
          .status(200)
          .json({
            id:validAdmin._id,
            username:validAdmin.username,
            email:validAdmin.email
          });
    }else{
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

const createUser = asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User Already Exist");
    }
    
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    
    const user = await newUser.save();
  
    if (user) {
      res.status(201).json({
        //success: true,
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error("Invalid user data");
    }
})

const editUser = asyncHandler(async(req,res)=>{
    console.log('hey')
    try {
        if (!req.body.username && !req.body.email && !req.body.password) {
          return res.status(400).json({ message: "No fields to update" });
        }
    
        if (req.body.password) {
          req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
    
        const { id } = req.params;
        console.log(id)
        const userData = await User.findOne({ _id: id });
        console.log(userData);
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const updatedUser = await User.findByIdAndUpdate(
          userData._id,
          {
            $set: {
              username: req.body.username || userData.username,
              email: req.body.email || userData.email,
              password: req.body.password || userData.password,
              image: ''
            },
          },
          { new: true }
        );
    
        if (!updatedUser) {
          return res.status(500).json({ message: "Failed to update user" });
        }
    
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({
            //success:true,
            id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email
        });
        console.log('success')
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      
  
})


const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({is_admin:0}).select('_id username email');
console.log(users[0]);
    res.status(200).json({users});
    console.log('success')
});

const deleteUser = asyncHandler(async(req,res)=>{
  /*if(req.user !== req.params.id){
    return res.status(404).json("You can delete only you account");
  }*/
  console.log(req.params.id);
  try{
   const user =  await User.findByIdAndDelete(req.params.id);
   const users = await User.find();
    res.status(200).json({message:'User has been deleted..',users});
    console.log('success');
    }
  catch(error){
    console.log(error);
    throw new Error(error);
    
  }

})


const singleUser = asyncHandler(async(req,res)=>{
  
  const {id} = req.params;
  const user = await User.findOne({_id:id});
  res.status(200).json({
    _id:user._id,
    username:user.username,
    email:user.email
  })
 
})

const signout = asyncHandler(async(req,res)=>{
  console.log('gey')
  res.clearCookie('acces_token1').status(200).json('Signout success!');
  console.log('success');
})

export {login,editUser,createUser,getUsers,deleteUser,singleUser,signout}