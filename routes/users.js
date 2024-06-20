import express from 'express';
import User from '../models/Users.js'

const router = new express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        const response = []
        users.forEach(e => {
            response.push({
                username: e.username,
                displayName: e.displayName,
                // friends: e.friends,
                characters: e.characters
            });
        });
        res.send(response);
    }
    catch (error) {
        res.send(error);
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const usernameTaken = await User.findOne({username: req.body.username});
        console.log(usernameTaken);

        if (usernameTaken) {
            return res.send('username not available!');
        }
        const user = await User.create(req.body);
        res.send(user);
        // res.json(user).status(203);
    }
    catch (error) {
        res.send(error);
        console.log(error);
    }
});

router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        res.send({
            Username: user.displayName,
            characters: user.characters
        });
    }
    catch (error) {
        res.send({error: 'Error, Invalid data'});
        console.log(error);
    }
});
router.put('/char/:username', async (req, res) => {
    try {
        const characters = req.body;
        console.log(characters)
        const user = await User.findOneAndUpdate({username: req.params.username}, { characters: characters });
        res.send({
            Username: user.displayName,
            characters: user.characters
        });
    }
    catch (error) {
        res.send({error: 'Error, Invalid data'});
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.send({
            deletedUser: deletedUser,
            message: 'User deleted!'
        }

        );
    }
    catch (error) {
        res.send({error: 'Error, Invalid data'});
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const usernameTaken = await User.findOne({username: req.body.username});
        console.log(usernameTaken);

        if (usernameTaken) {
            return res.send('username not available!');
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(updatedUser);
    }
    catch (error) {
        res.send({error: 'Error, Invalid data'});
        console.log(error);
    }
});

export default router;