import User from "../models/user.model.js";

export const applyToJob = async (req, res) => {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {$addToSet: {appliedJobs: jobId}}, {new: true});
        if(!updatedUser) return res.status(404).json({msg: "Cannot find user with that id"});
        res.status(200).json({msg: "Applied to job"});
    } catch (error) {
        console.error(`Error applying to job: ${error.message}`);
        res.status(500).json({msg: "Error applying to job"});
    }
};

export const unApplyToJob = async (req, res) => {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {$pull: {appliedJobs: jobId}}, {new: true});
        if(!updatedUser) return res.status(404).json({msg:"Could not find user"});
        res.status(200).json({msg: "Unapplied from job"})
    } catch (error) {
        console.error(`Error unapplying from job: ${error.message}`);
        res.status(500).json({msg:"Error unapplying from job"});
    }
}

export const getAppliedJobs = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const user = await User.findById(userId).populate("appliedJobs");
        return res.status(200).json({jobs: user.appliedJobs});
    } catch (error) {
        console.error(`Error getting applied jobs: ${error.message}`);
        res.status(500).json({msg: "Error getting applied jobs"})
    }
}

export const isApplied = async (req, res) => {
    const { jobId } = req.params;
    const user = await User.findById(req.user.id);
    const isApplied = user.appliedJobs.includes(jobId);
    res.json({ isApplied });
}