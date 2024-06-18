import express from 'express';
import User from '../models/Users.js'

const router = new express.Router();

router.post('/signup', async (req, res) => {
    // res.send('Doing some Auth stuff');
    try {
        const emailInUse = await User.findOne({email: req.body.email});
        if(emailInUse) {
            return res.send('Email in use!');
        }
        const user = await User.create(req.body);
        res.send(user);
    } catch (err){
        res.send({error: 'Error, Invalid data'});
        console.log(err);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const dbUser = await User.findOne({email: req.body.email});
        if(!dbUser) {
            return res.send('Something went wrong! Check your credentials.');
        }
        if(dbUser.password !== req.body.password) {
            console.log(`Bad Login attempt for ${dbUser.username}`);
            return res.send('Something went wrong! Check your credentials.');
        }
        res.send(dbUser);
    } catch (err){
        res.send({error: 'Error, Invalid data'});
        console.log(err);
    }
});

export default router;