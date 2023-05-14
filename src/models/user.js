import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    _id:{
        type: String || ObjectId
    },
    points: {
        type: String
    },
    // firstname: {
    //     type: String,
    // },
    // age: {
    //     type: Number,
    // },
    // gender: {
    //     type: Boolean,
    // },
    // cholesterol: {
    //     type: Number,
    // },
    // height: {
    //     type: Number,
    // },
    // weight: {
    //     type: Number,
    // },
    // img: {
    //     type: String,
    // },
})

const User = new model("User", userSchema);
export default User;