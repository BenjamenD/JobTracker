import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: true
    },
    date_posted:{
        type: Date,
        required: true
    },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;