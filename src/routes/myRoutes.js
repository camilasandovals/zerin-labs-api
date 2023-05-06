import express from "express";
import { getUsers, getMedications, addMedication, addUser, deleteMedication } from "../controllers/mycontrollers.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to my API");
});

router.get("/users", getUsers);


export default router;