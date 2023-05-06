import { ObjectId } from "mongodb";
import User from "../models/user.js";
import Medication from "../models/UserMedication.js";

export async function getUsers(req, res) {
  const allUsers = await User.find();
  res.status(200).send(allUsers);
}

export async function addUser(req,res){
    const {username, password} = req.body;
    const newUser = new User({username, password});
    await newUser.save();
    res.send({ message: "user added"});
}


