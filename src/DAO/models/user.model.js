const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        default: 18
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        default: null,
        unique: true
    },
    github: {
        id: Number,
        username: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
