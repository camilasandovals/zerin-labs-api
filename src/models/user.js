import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
    uid: {
        type: String,
        required: true,
        // unique: true
    },
    hashedPassword: {
        type: String,
    },
    points: {
         type: String, default: 0 
    },
    createdAt: { 
        type: Date, default: Date.now 
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