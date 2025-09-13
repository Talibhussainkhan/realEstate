import express from 'express';
import { singup } from '../controller/authController.js';


const authRouter = express.Router();

authRouter.post('/signup', singup)

export default authRouter;