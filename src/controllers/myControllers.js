import { ObjectId } from "mongodb";
import User from "../models/user.js";
import Medication from "../models/userMedication.js";
// import jwt from "jsonwebtoken"
// import dotenv from "dotenv";

// const secretKey  = process.env.secretKey;

// --------------------Users 
export async function getUsers(req, res) {
  const allUsers = await User.find();
  res.status(200).send(allUsers);
}
export async function addUser(req, res) {
  try {
    const { email, password, userId } = req.body;

    const newUser = new User({
      email,
      password,
      _id: userId, 
    });

    const addUser = await newUser.save();

    res.status(201).send(addUser);
  } catch (error) {
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
  const allMedication = await Medication.find();
  res.status(200).send(allMedication);
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
  try {
    const {nameMed, dosage, frequency, unit, quantity, notes, medImg, show } = req.body;
    const newMedication = new Medication({nameMed, dosage, frequency, unit, quantity, notes, medImg, show});
    await newMedication.save();
    await getMedications(req, res);
  }
  catch (error) {
  res.status(500).send({ message: "An error ocurred"});
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
