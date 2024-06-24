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
const allowedOrigins = ['http://localhost:5173',
'https://honkai-share-rail.netlify.app/']

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({origin:'*'}))
// app.use(cors({
//     origin: function(origin, callback){    // allow requests with no origin 
//         // (like mobile apps or curl requests)
//         if(!origin) return callback(null, true);    if(allowedOrigins.indexOf(origin) === -1){
//           var msg = 'The CORS policy for this site does not ' +
//                     'allow access from the specified Origin.';
//           return callback(new Error(msg), false);
//         }    return callback(null, true);
//       }
// }));

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the User Auth API!');
});

app.get('/characters', async (req, res) => {
    console.log('trying to grab data')
    // const fetchPromise = fetch("https://api.enka.network/store/hsr/honker_characters.json");
    // fetchPromise.then((response) => response.json()).then((data) => {console.log(data);});

    const data = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/hsr/honker_characters.json')
    const json = await data.json();
    res.send(json);
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use( (err, req, res, next) => {
    res.send('Something went Really Wrong!')
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});