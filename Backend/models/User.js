import mongoose from 'mongoose';
import crypto from 'crypto';

const list = require('./Lists');
const friend = require('./Friend')
const message = require('./Message')

const UserSchema = mongoose.Schema({
  avatar: String,
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
  },
  username: {
    type: String,
    index: true,
    unique: true,
    required: [true, 'A username is required.'],
  },
  password: {
    type: String,
    required: [true, 'A password is required.'],
  },
  e_mail: {
    type: String,
    trim: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  description: {
    type: String,
    maxlength: 140,
  },
  lists: {
    favourites: [list.schema],
    wishlist: [list.schema],
    ownedgames: [list.schema],
  },
  friends: {
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
  },
});

const User = mongoose.model('User', UserSchema);
User.createIndexes();
module.exports = User;
