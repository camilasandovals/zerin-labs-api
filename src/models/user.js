import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: Boolean,
    },
    cholesterol: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    img: {

    },
})

const User = new model("User", userSchema);
export default User;