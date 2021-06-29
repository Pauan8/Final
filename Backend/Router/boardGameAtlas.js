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
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = Promise;

const authenticateUser = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({
      accessToken: req.header('Authorization'),
    });
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
      ? res.json({
          userID: allUsers._id,
          username: allUsers.username,
          name: allUsers.name,
          surname: allUsers.surname,
          avatar: allUsers.avatar,
          e_mail: allUsers.e_mail,
          success: true,
          loggedOut: false,
          lists: allUsers.lists,
        })
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
        username: user.username,
        name: user.name,
        surname: user.surname,
        avatar: user.avatar,
        e_mail: user.e_mail,
        lists: user.lists,
        age: user.age,
        description: user.description,
        friends: user.friends,
        success: true,
        loggedOut: false,
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
  try {
    let privateProfile = await User.findById(id).exec();
    res.json({
      userID: privateProfile._id,
      username: privateProfile.username,
      name: privateProfile.name,
      surname: privateProfile.surname,
      avatar: privateProfile.avatar,
      e_mail: privateProfile.e_mail,
      lists: privateProfile.lists,
      age: privateProfile.age,
      description: privateProfile.description,
      friends: privateProfile.friends,
      success: true,
      loggedOut: false,
    });
  } catch (err) {
    catchError(res, err, 'Invalid user id');
  }
});

router.post('/profile/:id/addFriend/:username', authenticateUser)
router.post('/profile/:id/addFriend/:username', async (req, res) => {
  const { id, username } = req.params;
  try {
    const exists = await User.find({
    _id: id, 'friends.username': username
  })
  if (exists.length === 0) {
     const user = await User.findByIdAndUpdate(id, {$push: {friends: {username: username, status: 0, state: 'sender'}}}, {new: true})
     await User.findOneAndUpdate({username: username}, {$push: {friends: {username: user.username, status: 0, state: 'reciever'}}})
      res.json({
        friends: user.friends,
        success: true,
        loggedOut: false,
      })
    }
  } catch (err) {
      catchError(res, err, 'Invalid user id');
    }
  });

router.post('/profile/:id/friendRequest/:userId', authenticateUser)
router.post('/profile/:id/friendRequest/:userId', async (req, res) => {
  const { id, userId } = req.params;
  const { status } = req.query;

  try {
   const user = await User.findOneAndUpdate({_id: id, friends: {_id: userId}},  {$set:{"friends.status": status}}, {new:true}); 
   /*  await findOneAndUpdate({username: username, 'friends.username': user.username}, {set: {'friends.status': status}}, {new: true}); */
      res.json({
        friends: user.friends,
        success: true,
        loggedOut: false,
      })
    } catch (err) {
      catchError(res, err, 'Invalid user id');
    }
});

router.post('/profile/:id/sendMessage', authenticateUser)
router.post('/profile/:id/sendMessage', async (req, res) => {
  const { username } = req.query;
  
  try {
    const user = await Friend.findOneAndUpdate({_id: id, friends: {username: username}}, {$push: {messages: req.body.message}}, {new:true});
    const messages = user.friends.map(friend => friend.username === [username]? friend.messages : null)
    res.json({
      messages: [messages],
      success: true,
      loggedOut: false,
    })
  } catch (err) {
    catchError(res, err, 'Invalid user id');
  }
});

router.post('/profile/:id/addGame/:gameId', authenticateUser);
router.post('/profile/:id/addGame/:gameId', async (req, res) => {
  const { id, gameId } = req.params;
  const { list } = req.query;
  const attr = `lists.${list}`;

  try {
    const exists = await User.find({
      _id: id,
      $and: [{
      [attr]: {
        $elemMatch: {
          id: { $in: gameId },
        },
      }}],
    });
    if (exists.length === 0) {
      const user = await User.findByIdAndUpdate(
        id,
        { $push: { [attr]: req.body[list] } },
        { new: true }
      );
      res.json({
        lists: user.lists,
        success: true,
        loggedOut: false,
      });
    } 
  } catch (err) {
    catchError(res, err, 'Invalid user id');
  }
});

router.delete('/profile/:id/removeGame/:gameId', authenticateUser);
router.delete('/profile/:id/removeGame/:gameId', async (req, res) => {
  const { id, gameId } = req.params;
  const { list } = req.query;
  const attr = `lists.${list}`;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { [attr]: { id: gameId } } },
      { new: true }
    );
    res.json({
      lists: user.lists,
      success: true,
      loggedOut: false,
    });
  } catch (err) {
    catchError(res, err, 'Invalid user id');
  }
});

router.post('/profile/:id/edit', authenticateUser);
router.post('/profile/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
    let params = {};
    for (let prop in req.body)
      if (req.body[prop]) params[prop] = req.body[prop];

    let updateProfile = await User.findByIdAndUpdate(id, {
      $set: params,
    }).exec();
    res.json({
      name: updateProfile.name,
      surname: updateProfile.surname,
      avatar: updateProfile.avatar,
      e_mail: updateProfile.e_mail,
      age: updateProfile.age,
      description: updateProfile.description,
      success: true,
      loggedOut: false,
    });
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
    res.json({
      userID: userProfile._id,
      username: userProfile.username,
      name: userProfile.name,
      surname: userProfile.surname,
      avatar: userProfile.avatar,
      e_mail: userProfile.e_mail,
      friends: userProfile.friends,
      loggedOut: false,
      success: true,
    });
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
      e_mail,
    }).save();
    res.json({
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken,
      name: newUser.name,
      surname: newUser.surname,
      e_mail: newUser.e_mail,
      success: true,
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
    res.json(deleteAll, { success: false });
  } catch (err) {
    catchError(res, err, 'Something went wrong');
  }
});

module.exports = router;
