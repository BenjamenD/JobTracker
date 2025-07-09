import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authheader.startsWith("Bearer ")){
        return res.status(401).json({msg: "Authorization denied, no token"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        console.error(`Error verifying token: ${error.message}`);
        res.status(401).json({mag: "Error verifying token"});
    }
}

export default auth;