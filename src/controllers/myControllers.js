import { hashSync } from "bcrypt"
import { ObjectId } from "mongodb";
import User from "../models/user.js";
import Medication from "../models/userMedication.js";
// import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
// const secretKey  = process.env.secretKey;
const salt  = process.env.salt;
// --------------------Users 
export async function getUsers(req, res) {
  const allUsers = await User.find();
  res.status(200).send(allUsers);
}

export async function getUser(req, res) {  //Just one user
  const { uid } = req.query;
  try {
    const user = await User.find({ email : uid });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Error retrieving user");
  }
}

export async function addUser(req, res) {
  try {
    const { email, password, uid } = req.body;
    if (!email || (password && password.length < 8)) {
      res.status(400).send({
        message:
          "Email and password are required. Password must be 8 characters or long",
      });
      return;
    }

    const doc = await User.findOne({ email: email })
    if (doc) {
        res.status(401).send({message: "Email already exists. Please try logging in instead"})
        return;
    }

    let hashedPassword = null
      
    if (password) hashedPassword = hashSync(password, salt)
    
    const newUser = new User({
      uid,
      _id: new ObjectId(uid),
      email,
      hashedPassword: hashedPassword || null,
    });

    const addUser = await newUser.save();

    res.status(201).send(addUser);
  } 
  catch (error) {
    res.status(500).json({
      error: [error.message],
      message: "an error",
    });
  }
}
export async function addUserInfo(req,res){
  const {firstname, age, gender, cholesterol, height, weight, img} = req.body;
  const infoUser = new User({firstname, age, gender, cholesterol, height, weight, img});
  await infoUser.save();
  res.send({ message: "user information added" });
}
// ---------------   Medications
export async function getMedications(req, res) {
  const { uid } = req.query;
  
  try {
    const medications = await Medication.find({ uid });
    res.status(200).send(medications);
  } catch (error) {
    res.status(500).send("Error retrieving medications");
  }
}
export async function getMedInfo(req,res){
  try {
    const docId = { "_id": new ObjectId(req.params.docId)}
    const medication = await Medication.findOne(docId);
    res.send(medication)
  }
  catch (error) {
  res.status(500).send({ message: "An error ocurred"});
  }
}
export async function addMedication(req,res){
  // const token = req.header.authorization
  //   if(!token) {
  //       res.status(401).send({message: "Unauthorized. A valid token is required."})
  //       return
  //   }
  try {
    const {nameMed, dosage, frequency, unit, quantity, notes, medImg, show, uid, endDate, doctor, reactions, takingPerDayOrWeek, totalTaken } = req.body;
    const newMedication = new Medication({nameMed, dosage, frequency, unit, quantity, notes, medImg, show, uid, endDate, doctor, reactions, takingPerDayOrWeek, totalTaken });
    await newMedication.save();
    await getMedications(req, res);
  }
  catch (error) {
    res.status(500).json({
      error: [error.message],
      message: "an error",
    });
  }
}
export async function deleteMedication(req, res){
  try{
    const docId = { "_id": new ObjectId(req.params.docId)}
    await Medication.deleteOne(docId);
    await getMedications(req, res);
  } catch(error) {
    res.status(500).send({message : "An error ocurred"})
  }
}
export async function updateMedication(req, res){
  try {
  const docId = { "_id": new ObjectId(req.params.docId)
    }
  const updateMed = {$set:req.body};
  const returnOption = { returnNewDocument: true};
  await Medication.findOneAndUpdate(docId, updateMed, returnOption);
  await getMedications(req, res);
  }
  catch {
    res.status(200).send({message: "updated"})
  }
}