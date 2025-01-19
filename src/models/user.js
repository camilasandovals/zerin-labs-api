import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    // unique: true
  },
  hashedPassword: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
  uid: {
    type: String,
  },
  fullname: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  img: {
    type: String,
    default:
      "https://milasnewbucket.s3.us-east-2.amazonaws.com/user+icon+Zerinlabs2.png",
  },
});

const User = new model("User", userSchema);
export default User;
