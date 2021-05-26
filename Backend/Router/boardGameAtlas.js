import express from 'express';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const User = require('../models/User');

const router = express.Router();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/boardGameAtlas';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = Promise;

const authenticateUser = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({
      accessToken: req.header('Authorization'),
    })
    if (currentUser) {
      req.user = currentUser;
      next();
    } else {
      res.status(401).json({ success: false, loggedOut: true });
    }
  } catch (err) {
    catchError(res, err, 'Something went wrong');
  }
};

const catchError = (res, err, msg) => {
  return res
    .status(400)
    .json({ success: false, message: msg, errors: err.errors });
};

router.get('/', async (_req, res) => {
  try {
    res.json(listEndpoints(router));
  } catch (err) {
    res.status(404).send({ success: false, error: 'Not found' });
  }
});

router.get('/users', async (_req, res) => {
  try {
    const allUsers = await User.find().exec();
    return allUsers
      ? res.json(allUsers, {success: true })
      : res.json({ success: false, message: 'No users in the database' });
  } catch (err) {
    catchError(res, err, 'Something went wrong');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        userID: user._id,
        accessToken: user.accessToken,
        success: true,
        loggedOut: false
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Wrong username or password' });
    }
  } catch (err) {
    catchError(res, err, 'Something went wrong');
  }
});

router.get('/profile/:id', authenticateUser);
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { edit } = req.query;
  const { avatar, name, surname } = req.body;
  try {
    let privateProfile = await User.findById(id, { password: 0 }).exec();
    if (edit) {
      privateProfile = await User.findByIdAndUpdate(id, {
        avatar,
        name,
        surname
      }).exec();
    } else {
      res.json({privateProfile, success: true, loggedOut: false });
    }
  } catch (err) {
    catchError(res, err, 'Invalid user id');
  }
});

router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const userProfile = await User.findOne(
      { username },
      { accessToken: 0, password: 0 }
    ).exec();
    res.json(userProfile, {success: true });
  } catch (err) {
    catchError(res, err, 'Invalid user id');
  }
});

router.post('/users', async (req, res) => {
  const { username, password, name, surname, e_mail } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
      name,
      surname,
      e_mail
    }).save();
    res.json({
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken,
      name: newUser.name,
      surname: newUser.surname,
      e_mail: newUser.e_mail,
      success: true
    });
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(401)
        .json({ success: false, error: 'That username is already taken' });
    } else {
      catchError(res, err, 'Something went wrong');
    }
  }
});

router.delete('/users', async (_req, res) => {
  try {
    const deleteAll = await User.deleteMany();
    res.json(deleteAll, {success: false });
  } catch (err) {
    catchError(res, err, 'Something went wrong');
  }
});

module.exports = router;
