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
    publisher: String

  }])

const Favourites = mongoose.model('Favourites', ListSchema);
const wishlist = mongoose.model('wishlist', ListSchema);
const Owned = mongoose.model('Owned', ListSchema);
module.exports = Favourites, wishlist, Owned