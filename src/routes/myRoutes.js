import express from "express";
import { getUsers, getMedications, getMedInfo, addMedication, addUser, deleteMedication, updateMedication, addUserInfo } from "../controllers/myControllers.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to my API");
});

router.get("/users", getUsers);
router.post("/users", addUser);
router.post("/usersinfo", addUserInfo);
router.get("/medications", getMedications);
router.get("/medications/:docId", getMedInfo);
router.post("/medications", addMedication);
router.patch("/medications/:docId", updateMedication);
router.delete("/medications/:docId", deleteMedication)

export default router;