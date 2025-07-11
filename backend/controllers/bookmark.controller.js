import User from "../models/user.model.js";

export const bookmarkJob = async (req, res) => {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {$addToSet: {bookmarkedJobs: jobId}}, {new: true});
        if(!updatedUser) return res.status(404).json({msg: "Cannot find user with that id"});
        res.status(200).json({msg: "Bookmarked job"});
    } catch (error) {
        console.error(`Error bookmarking job: ${error.message}`);
        res.status(500).json({msg: "Error bookmarking job"});
    }
};

export const unBookmarkJob = async (req, res) => {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {$pull: {bookmarkedJobs: jobId}}, {new: true});
        if(!updatedUser) return res.status(404).json({msg:"Could not find user"});
        res.status(200).json({msg: "Unbookmarked job"})
    } catch (error) {
        console.error(`Error unbookmarking job: ${error.message}`);
        res.status(500).json({msg:"Error unbookmarking job"});
    }
}

export const getBookmarkedJobs = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const user = await User.findById(userId).populate("bookmarkedJobs");
        return res.status(200).json({jobs: user.bookmarkedJobs});
    } catch (error) {
        console.error(`Error getting bookmarked jobs: ${error.message}`);
        res.status(500).json({msg: "Error getting bookmarked jobs"})
    }
}

export const isBookmarked = async (req, res) => {
    const { jobId } = req.params;
    const user = await User.findById(req.user.id);
    const isBookmarked = user.bookmarkedJobs.includes(jobId);
    res.json({ isBookmarked });
}