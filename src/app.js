import './config/env';

import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import router from './routes';

const swaggerDoc = require('./swaggerDoc');

class App {
  constructor() {
    this.server = express();
    this.isTest = process.env.NODE_ENV === 'test';

    swaggerDoc(this.server);
    this.middlewares();
    this.database();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(router);
  }

  database() {
    if (!this.isTest) {
      mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useCreateIndex: true,
        useNewUrlParser: true,
      });
    }
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err.status) {
        return res.status(err.status).json(err);
      }

      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (process.env.NODE_ENV !== 'production') {
        return res.status(500).json(err);
      }

      return res.status(500).json({ message: 'Internal server error' });
    });
  }
}

export default new App().server;
