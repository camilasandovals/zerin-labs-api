import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import myRoutes from "./routes/myRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use("/api/", myRoutes);

//mongoose connection
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connection to Mongo Database established");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}/api/`);
  });
}

export default app;
