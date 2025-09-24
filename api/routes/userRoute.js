import express from 'express';
import { deleteUser, getUserListings, updateUserInfo, getUser } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();

userRouter.post('/update/:id', verifyToken ,updateUserInfo);
userRouter.delete('/delete/:id', verifyToken ,deleteUser);
userRouter.get('/listing/:id', verifyToken, getUserListings);
userRouter.get('/:id', verifyToken, getUser);

export default userRouter;