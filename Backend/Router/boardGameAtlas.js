import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'

const router = express.Router();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/boardGameAtlas'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

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

router.delete('/users/:userId', async (req, res) => {

})

module.exports = router;