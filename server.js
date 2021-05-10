// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// UNCAUGHT EXCEPTIONS
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Shutting down...');
  process.exit(1);
});

// CONFIGURE SERVER
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// INCLUDE APP
const app = require('./app');

// LISTEN
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// CONNECT TO DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// UNHANDLED REJECTIONS
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
