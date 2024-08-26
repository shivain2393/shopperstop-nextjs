import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    },
    shoppingCart: {
        type: Array,
        default: []
    }
})

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);