import mongoose from 'mongoose'
import crypto from 'crypto'

const list = require('./Lists')
  
const UserSchema = mongoose.Schema(
  {
    avatar: String,
    name: {
      type: String
    },
    surname: {
      type: String
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
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString('hex')
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    },
    lists: {
      favourites: [ list.schema ],
      wishlist: [list.schema],
      ownedgames: [list.schema]

    }
  }
)
  
const User = mongoose.model('User', UserSchema);
User.createIndexes();
module.exports = User;