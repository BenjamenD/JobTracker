import User from '../models/user.model.js'

export const getDashboard = (req, res) => {
    res.json({msg: `welcome ${req.user.id}`});
}

export const getUser = (req, res) => {
    const user = req.user.id;

    try {
        if(req.user.id){
            console.log("Returned user");
            return res.status(200).json({user: req.user})
        }
    } catch (error) {
        console.error(`Error returning user: ${error.message}`);
        return res.status(404).json(null)
    }

}