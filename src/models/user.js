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
})

const User = new model("User", userSchema);
export default User;