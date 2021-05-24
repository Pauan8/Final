import mongoose from 'mongoose'
import crypto from 'crypto'
  
const UserSchema = mongoose.Schema(
  {
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
      minlength: 5,
      maxlength: 12
    },
    password: {
      type: String,
      required: [true, 'A password is required.'],
      select: false //does not get returned 
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString('hex')
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    }
  }
)
  
const User = mongoose.model('User', UserSchema);
User.createIndexes();
module.exports = User;