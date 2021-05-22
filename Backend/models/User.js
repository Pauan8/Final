import mongoose from 'mongoose'

const ListSchema = mongoose.Schema([
  {
    type: Object,
    name: String,
    category: String,
    user_rating: {
      type: Number,
      min: 0,
      max: 5
    },
    id: {
      type: String,
      required: true
    },
    release_year: Number,
    publisher: String
  }
])
  
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
      minlength: 8,
      maxlength: 12
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    },
    lists: {
      type: [
        {
          owned: { type: ListSchema },
          favourites: { type: ListSchema },
          wishlist: { type: ListSchema }
        }
      ]
    }
  }
)
  
const User = mongoose.model('User', UserSchema);
User.createIndexes();
module.exports = User;