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
 
})

const message = mongoose.model('message', MessageSchema);
module.exports = message;    