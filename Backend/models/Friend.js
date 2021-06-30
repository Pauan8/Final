import mongoose from 'mongoose';

const message = require('./Message')

const FriendSchema = mongoose.Schema([{
    username: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'A username is required.'],
      },
      status: Number,
      state: String,
      messages: {    
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
  }
    }])

    const friend = mongoose.model('friend', FriendSchema);
    module.exports = friend;    