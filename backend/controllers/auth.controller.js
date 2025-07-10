import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if (user) return res.status(400).json({msg: "Email is already registered"});

        //hash the password if the user doesnt exist already
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({token, user: {id: user._id, name: user.name, emai: user.email}});
        
    } catch (error) {
        console.error(`Error registering new user: ${error.message}`);
        res.status(500).json({msg: "Error registering new user"});
    }
}

export const authenticateUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({msg: "Credentials are not valid"});
        
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({msg: "Credentials are not valid"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({msg:"Login successful", token, user: {id: user._id, name: user.name, email: user.email}});


    } catch (error) {
        console.error(`Error authenticating user: ${error.message}`);
        res.status(500).json({msg: "Error authenticating user"});
    }
}