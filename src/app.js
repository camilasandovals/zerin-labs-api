import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import myRoutes from "./routes/myroutes.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/", myRoutes);

//mongoose connection
const mongoUri  = process.env.MONGOURI;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connection to Mongo Database established");
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});