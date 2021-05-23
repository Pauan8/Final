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

const List = mongoose.model('List', ListSchema);
module.exports = List