import User from '../models/user.model.js'

export const getDashboard = (req, res) => {
    res.json({msg: `welcome ${req.user.id}`});
}
