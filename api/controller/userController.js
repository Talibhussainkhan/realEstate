import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js"

export const test = (req, res)=>{
    res.json({ message : 'api route is working' })
}


export const updateUserInfo = async (req, res, next) =>{
    if( req.user.id !== req.params.id ) return next(errorHandler(401, "You can only update your own account!"));
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
          // MongoDB me $set ek update operator hai.
         //Agar username, email, password fields already document me hai → unki values update ho jaayengi.
         // Agar nahi hai → MongoDB un fields ko add kar dega with given values.
            $set : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password
            }
            // new true updated user de gha variable main
        },{ new : true })
        // jab hum mongo db variable destructure kar the hai to ._doc lazmi warni woh or data bhi deta jis ki need ni 
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}