import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'

const router = express.Router();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/boardGameAtlas'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

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
    username: {
      type: String,
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

router.get('/', async (req, res) => {
  try {
    res.json(listEndpoints(router))
  } catch (err) {
    res.status(404).send({ error: 'Not found' })
  }
})

router.get('/users', async (req, res) => {
 
});

router.get('/users/:userId', async (req, res) => {

})

router.post('/users/:userId', async (req, res) => {

})

module.exports = router;