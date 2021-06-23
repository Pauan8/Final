import mongoose from 'mongoose';

const FriendSchema = mongoose.Schema({
    avatar: String,
    username: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'A username is required.'],
      }
    })

    const friend = mongoose.model('friend', FriendSchema);
    module.exports = friend;    