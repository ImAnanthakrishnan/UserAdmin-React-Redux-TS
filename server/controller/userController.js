import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const signup = asyncHandler(async (req, res) => {
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
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });
  //console.log(validUser);
  
  if (validUser && validUser.is_admin === 0 && (bcryptjs.compareSync(password,validUser.password))) {
    const { password: hashedPassword, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);
    console.log(rest)
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({
        id:validUser._id,
        username:validUser.username,
        email:validUser.email,
        image:validUser.image
      });
  } else {
    res.status(400);
    throw new Error('Invalid email or password')
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
   /* if (!req.body.username && !req.body.email && !req.body.password) {
      return res.status(400).json({ message: "No fields to update" });
    }*/
    const { user } = req;
    const userData = await User.findOne({ _id: user.id });

    if(req.body.username === userData.username && req.body.email === userData.email){
      
      return res.status(400).json({message:"No fields to update"})
    }

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }



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
          image:  userData.image
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update user" });
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      id:updatedUser._id,
      username:updatedUser.username,
      email:updatedUser.email,
      image:updatedUser.image
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const uploadProfileImage = asyncHandler(async (req, res) => {
  console.log('helo')
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const image = req.file;
  console.log(image);

  const { user } = req;
  console.log(user);
 
  try {
    const userData = await User.findById(user.id);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userData.image) {
      const oldImagePath = path.join(__dirname,  '..', 'public', 'profilePic', userData.image);
      fs.unlinkSync(oldImagePath);
    }

    userData.image = image.filename;

    const updateUser = await userData.save();
    console.log('updated-',updateUser)
    res.status(200).json({
      id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      image: updateUser.image
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const logout = asyncHandler(async(req,res)=>{
  res.clearCookie('access_token').status(200).json('Signout success!')
})


export { signup, login ,uploadProfileImage ,updateUser,logout};
