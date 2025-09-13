import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';

export const singup = async (req, res, next) =>{
    const { username, email, password } = req.body;
    const hashedPasseord = await bcryptjs.hash(password, 10);
    try {
        const newUser = await User.create({ username, email, password : hashedPasseord });
        res.status(201).json('user created sucessfully')
    } catch (error) {
        next(error)
    }
}