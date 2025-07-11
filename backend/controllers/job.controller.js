import Job from "../models/job.model.js";

export const getJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const skip = (page - 1) * limit;

        const jobs = await Job.find().sort({ date_posted: -1 }).skip(skip).limit(limit);

        if(!jobs){
            console.log("Error getting jobs");
            return res.status(404).json({msg: "Error getting jobs"});
        }

        const totalJobs = await Job.countDocuments();

        res.status(200).json({
            jobs,
            page,
            totalPages: Math.ceil(totalJobs / limit),
            hasMore: skip + jobs.length < totalJobs,
        });

    } catch (error) {
        console.error(`Error getting jobs: ${error.message}`);
        res.status(500).json({msg: "Server error while getting jobs"});
    }
}

export const getJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id)

        if(!job){
            console.log("Could not find requested job")
            return res.status(404).json({msg: "Could not find requested job"})
        }

        res.status(200).json(job)

    } catch (error) {
        console.error(`Error finding requested job: ${error.message}`);
        res.status(500).json({msg: "Error finding requested job"})
    }
}