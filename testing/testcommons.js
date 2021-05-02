// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
  .then(() => console.log('DB connection successful!'))
  .catch(() => console.log('Error connecting to the database!'));
