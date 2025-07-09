import Job from "../models/job.model.js";

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        if(!jobs){
            console.log("Error getting jobs");
            return res.status(404).json({msg: "Error getting jobs"});
        }
        
        res.status(200).json(jobs)

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