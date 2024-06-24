import express from 'express';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
dotenv.config();

const router = new express.Router();

const saltRounds = Number(process.env.SALTROUNDS);

router.post('/signup', async (req, res) => {
    // res.send('Doing some Auth stuff');
    try {
        const emailInUse = await User.findOne({email: req.body.email});
        if(emailInUse) {
            return res.send('Email in use!');
        }
        const userInUse = await User.findOne({email: req.body.email});
        if(userInUse) {
            return res.send('Username Taken!');
        }
        const newUser = {
            username: req.body.username,
            displayName: req.body.username,
            UID: req.body.UID,
            email: req.body.email,
            characters: []
        }
        newUser.password = await bcrypt.hash(await req.body.password, saltRounds);
        const user = await User.create(newUser);
        // req.body
        // username
        // password
        // uid
        // email
        const responseUser={
            username: newUser.username,
            displayName: newUser.displayName,
            characters: newUser.characters,
        }
        res.send(responseUser);
    } catch (err){
        res.send({error: 'Error, Invalid data'});
        console.log(err);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const dbUser = await User.findOne({username: req.body.username});
        if(await !dbUser) {
            console.log('No user!')
            return res.send('Something went wrong! Check your credentials.');
        }
        if(await !bcrypt.compare(req.body.password, dbUser.password)) {
            console.log(`Bad Login attempt for ${dbUser.username}`);
            return res.send('Something went wrong! Check your credentials.');
        }
        console.log("This one's good!")
        const responseUser={
            username: dbUser.username,
            displayName: dbUser.displayName,
            characters: dbUser.characters,
        }
        res.json(responseUser)
    } catch (err){
        res.send({error: 'Error, Invalid data'});
        console.log(err);
    }
});
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const dbUser = await User.findOne({username: req.body.username});
        if(await dbUser.password !== req.body.password) {
            console.log(`Bad Delete attempt for ${dbUser.username}`);
            return res.send('Something went wrong! Check your credentials.');
        }
        const responseUser= await User.findOneAndDelete({username: req.body.username});
        res.json('Deleted!');
    } catch (err){
        res.send({error: 'Error, Invalid data'});
        console.log(err);
    }
});

export default router;