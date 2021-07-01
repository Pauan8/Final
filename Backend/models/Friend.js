import mongoose from 'mongoose';

const message = require('./Message')

const FriendSchema = mongoose.Schema([{
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  username: String,
  status: Number,
  state: String,
  message: {
    type: [message.schema]
  }
}])

    const friend = mongoose.model('friend', FriendSchema);
    module.exports = friend;    