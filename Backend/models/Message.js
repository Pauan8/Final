import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    message: {
        type: String,
        required: [true, 'A message is needed'],
        minlength: 5,
        maxlength: 500
    },
    sender: {
        type: String
    },
    reciever: {
        type: String
    }
})

const message = mongoose.model('message', MessageSchema);
module.exports = message;    