import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const boardGameAtlas = require('./Router/boardGameAtlas.js');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  return mongoose.connection.readyState === 1
    ? next()
    : res.status(503).send({ Error: 'No Connection to server' });
});

app.use('/', boardGameAtlas);

app.listen(port, () => {

});
