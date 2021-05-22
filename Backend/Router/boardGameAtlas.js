import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'

const User = require('../models/User')

const router = express.Router();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/boardGameAtlas'
mongoose.connect(mongoUrl, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const catchError = (res, err, msg) => {
  return res.status(400).json({ message: msg, errors: err.errors })
}
 
router.get('/', async (req, res) => {
  try {
    res.json(listEndpoints(router))
  } catch (err) {
    res.status(404).send({ error: 'Not found' })
  }
})

router.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find().exec()
    return allUsers ? res.json(allUsers) : res.json({ message: "No users in the database" })
  } catch (err) {
    catchError(res, err, "Something went wrong")
  }
});

router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const currentUser = await User.findById(userId).exec()
    return currentUser ? res.json(currentUser) : res.status(400).json({ error: "Invalid user id" })
  } catch (err) {
    catchError(res, err, "Something went wrong")
  }
})

router.post('/users', async (req, res) => {
  try {
    const newUser = await new User(req.body).save()
    res.json(newUser)
  } catch (err) {
    if (err.code === 11000) {
      res.json({ error: 'That username is already taken' })
    } else {
      catchError(res, err, "Something went wrong")
    }
  }
})

router.delete('/users', async (req, res) => {
  try {
    const deleteAll = await User.deleteMany()
    res.json(deleteAll)
  } catch (err) {
    catchError(res, err, "Something went wrong")
  }
})

module.exports = router;