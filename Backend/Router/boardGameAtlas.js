import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const User = require('../models/User')

const router = express.Router();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/boardGameAtlas'
mongoose.connect(mongoUrl, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const authenticateUser = async (res, req, next) => {
  const currentUser = await User.finOne({ accessToken: req.headers('Authorization') })
  if (currentUser) {
    req.user = currentUser 
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
}

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

router.post('/auth/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const currentUser = await User.findOne({ username: name })
    if (currentUser && bcrypt.compareSync(password, currentUser.password)) {
      return res.json({ userId: currentUser._id, accessToken: currentUser.accessToken })
    } else {
      return res.status(404).json({ message: "Incorrect username or password" })
    }
  } catch (err) {
    catchError(res, err, "Something went wrong")
  }
})

router.get('/profile/:id', authenticateUser)
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { edit } = req.query;
  const { avatar, name, surname } = req.body;
  try {
    let privateProfile = await User.findById(id).exec()
    if (edit) {
      privateProfile = await User.findByIdAndUpdate(id, { avatar, name, surname }).exec()
    }
    res.json(privateProfile)
  } catch (err) {
    catchError(res, err, "Invalid user id")
  }
})

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userProfile = await User.findById(id, {accessToken: 0}).exec()
    res.json(userProfile)
  } catch (err) {
    catchError(res, err, "Invalid user id")
  }
})

router.post('/users', async (req, res) => {
  const { username, pw, name, surname } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User({ username, password: bcrypt.hashSync(pw, salt), name, surname }).save()
    res.json({
      username: newUser.username,
      accessToken: newUser.accessToken,
      name: newUser.name,
      surname: newUser.surname
    })
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