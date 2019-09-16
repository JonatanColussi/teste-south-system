import mongoose from 'mongoose';

export default () => {
  const uri = global.__MONGO_URI__ + global.__MONGO_DB_NAME__;

  if (!mongoose.connection.readyState) {
    mongoose.connect(uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  }
};
