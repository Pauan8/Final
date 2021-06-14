import mongoose from 'mongoose'

const ListSchema = mongoose.Schema([{
    strict: false,
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
    thumb_url: String
  }])

const list = mongoose.model('list', ListSchema);
module.exports = list