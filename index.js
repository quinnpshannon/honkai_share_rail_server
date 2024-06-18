import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import cors from 'cors'
//env variables
dotenv.config();

//connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the User Auth API!');
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use( (err, req, res, next) => {
    res.send('Something went Really Wrong!')
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});