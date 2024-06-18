import mongoose, {ObjectId} from "mongoose";

const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    displayName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 12
    },
    characters: [{
        key: String,
        level: Number,
        lightcone: String,
        traces: [{
            id: String,
            level: {
                type: Number,
                default: 1
            }    
        }]
    }],
    friends: [{
        username: String,
        _id: ObjectId
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
});
export default new mongoose.model('User', userSchema);