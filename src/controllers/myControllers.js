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

export async function getMedications(req, res) {
  const allMedication = await Medication.find();
  res.status(200).send(allMedication);
}

export async function addMedication(req,res){
  const {name, dosage, frequency, unit, quantity } = req.body;
  const newMedication = new Medication({name, dosage, frequency, unit, quantity});
  await newMedication.save();
  res.send({ message: "user added"});
}

export async function deleteMedication(req, res){
  const docId = { "_id": new ObjectId(req.params.docId)
    }
  await Medication.deleteOne(docId);
  res.status(202).send({message : "medication deleted"})
}

export async function updateMedication(req, res){
  const docId = { "_id": new ObjectId(req.params.docId)
    }
  const updateMed = {$set:req.body};
  const returnOption = { returnNewDocument: true};
  await Medication.findOneAndUpdate(docId, updateMed, returnOption);
  res.status(200).send({message: "updated"})
}
