import mongoose from 'mongoose';

const message = require('./Message')

const FriendSchema = mongoose.Schema({
    _id: false,
    user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: String,
    required: [true, 'A username is required.']
  },
  avatar: String,
  stat: Number,
  state: String,
  message: {
    type: [message.schema]
  }
})

    const friend = mongoose.model('friend', FriendSchema);
    module.exports = friend;    