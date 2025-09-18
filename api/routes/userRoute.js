import express from 'express';
import { deleteUser, updateUserInfo } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();

userRouter.post('/update/:id', verifyToken ,updateUserInfo);
userRouter.delete('/delete/:id', verifyToken ,deleteUser)


export default userRouter;