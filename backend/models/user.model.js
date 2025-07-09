import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model("User", UserSchema);