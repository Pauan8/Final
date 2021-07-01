import mongoose from 'mongoose';

const message = require('./Message')

const FriendSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'A username is required.'],
      },
      status: Number,
      state: String,
      messages: {
        type: [message.schema]
      }
    })

    const friend = mongoose.model('friend', FriendSchema);
    module.exports = friend;    