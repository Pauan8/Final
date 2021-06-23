import mongoose from 'mongoose';

const FriendSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'A username is required.'],
      },
      status: Number,
      state: String
    })

    const friend = mongoose.model('friend', FriendSchema);
    module.exports = friend;    