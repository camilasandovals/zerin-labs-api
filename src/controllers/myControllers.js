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
  const { email } = req.query;
  const thisUser = await User.findOne({email});
  res.status(200).send(thisUser);
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

    const doc = await User.findOne({ email: email.toLowerCase() })
    if (doc) {
        res.status(401).send({message: "Email already exists. Please try logging in instead"})
        return;
    }

    let hashedPassword = null
      
    if (password) hashedPassword = hashSync(password, salt)
    
    const newUser = new User({
      uid,
      _id: new ObjectId(uid),
      email: email.toLowerCase(),
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

export async function getUser(req, res) {
  const {email, password} = req.body
  if(!email || !password) {
    res.status(400).send({message: 'Email and password both required'})
    return
  }
  const hashedPassword = hashSync(password, salt)
  let user = await User.findOne({email: email.toLowerCase(), hashedPassword: hashedPassword})
  if(!user) {
    res.status(401).send({message: "Invalid email or password"})
    return
  }
  delete user.hashedPassword
  res.send(user)
}

export async function addUserInfo(req, res) {
  const { email } = req.query;
  try {
    const filter = { email };
    const update = { $set: req.body };
    const options = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(filter, update, options);
    await getUsers(req, res);
  } catch (error) {
    res.status(500).send({ message: "Error updating user" });
  }
}

// ---------------   Medications
export async function getMedications(req, res) {
  const { email } = req.query;
  
  try {
    const medications = await Medication.find({ email });
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
  
  try {
    const {nameMed, email, dosage, frequency, unit, quantity, notes, medImg, show, endDate, doctor, reactions, takingPerDayOrWeek, totalTaken } = req.body;
    const newMedication = new Medication({nameMed, email, dosage, frequency, unit, quantity, notes, medImg, show, endDate, doctor, reactions, takingPerDayOrWeek, totalTaken });
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
  //updating points
  const { email } = req.query;
  try {
    const points = { $inc: { points: 20 } }
    const user = await User.findOneAndUpdate({ email:email }, points, { returnOriginal: false });
    //await User.findOneAndUpdate(user, points, { returnOriginal: false });
    await getUsers(req, res);
  }
  catch {
    res.status(200).send({message: "points added"})
  }
}
export async function updateMedication(req, res){
  try {
  const returnOption = { returnNewDocument: true};
    const {variable, value} = req.body
    // console.log(variable, value,req.body)
  //No mostrar el medicamento despues de dar click
  const MedicationDocId = { "_id": new ObjectId(req.params.docId)}
  const medicationUpdate = {[variable]: value}
  await Medication.findOneAndUpdate(MedicationDocId, medicationUpdate, returnOption);


  //Sumatoria de 20 puntos al usuario
  const { email } = req.query;
  const userEmail = {email:email}
  const points = { $inc: { points: 20 } }
  await User.findOneAndUpdate(userEmail, points, returnOption);

  const medications = await Medication.find({ email });
  const thisUser = await User.findOne({email});

  const reply = {medications:medications, user:thisUser}
  res.status(200).json(reply)


  }
  catch {
    res.status(200).send({message: "updated medication"})
  }
}