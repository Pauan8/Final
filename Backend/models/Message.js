import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "friend"
      },
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
    sender: String,
    reciever: String
 
})

const message = mongoose.model('message', MessageSchema);
module.exports = message;    