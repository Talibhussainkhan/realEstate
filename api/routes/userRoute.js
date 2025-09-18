import express from 'express';
import { updateUserInfo } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();

userRouter.post('/update/:id', verifyToken ,updateUserInfo)


export default userRouter;