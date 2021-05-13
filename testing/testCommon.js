// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports.initTesting = () => {
  // CONFIGURE SERVER
  dotenv.config({ path: './config.env' });
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  // CONNECT TO DB
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .catch(() => console.log('Error connecting to the database!'));
};
