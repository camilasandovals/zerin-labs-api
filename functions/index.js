import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGOURI } from "./env.js";
import myRoutes from "./src/routes/myRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/", myRoutes);


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connection to Mongo Database established");
});
 
export const api  = functions.https.onRequest(app);
