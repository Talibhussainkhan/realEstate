import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { test } from './controller/userController.js';
import authRouter from './routes/authRouter.js';



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database Connected')
}).catch((err) => {
    console.log(err)
})

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', test)
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
