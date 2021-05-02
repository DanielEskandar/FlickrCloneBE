// INCLUDE DEPENDENCIES
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// INCLUDE MODELS
const userModel = require('./models/userModel');

// READ JSON FILES
const users = JSON.parse(fs.readFileSync('./data/Users.json', 'utf-8'));

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

// IMPORT DATA
const importData = async () => {
  try {
    await userModel.create(users);
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE DATA
const deleteData = async () => {
  try {
    await userModel.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else {
  deleteData();
}
