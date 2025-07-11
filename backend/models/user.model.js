import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

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
    appliedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    bookmarkedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }]
}, {
    timestamps: true
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model("User", UserSchema);