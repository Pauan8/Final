import mongoose from 'mongoose';

const message = require('./Message')

const FriendSchema = mongoose.Schema([{
  user_id: {
    type: mongoose.Types.Schema.ObjectId,
    ref: "User"
  },
  username: {
      type: String,
      required: [true, 'A username is required.'],
  },
  status: Number,
  state: String,
  message: {
    type: [message.schema]
  }
}])

    const friend = mongoose.model('friend', FriendSchema);
    module.exports = friend;    