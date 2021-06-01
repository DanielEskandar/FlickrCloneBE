// INCLUDE DEPENDENCIES
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// INCLUDE MODELS
const userModel = require('./models/userModel');
const groupModel = require('./models/groupModel');
const discussionModel = require('./models/discussionModel');
const photoModel = require('./models/photoModel');
const galleryModel = require('./models/galleryModel');
const albumModel = require('./models/albumModel');
const commentModel = require('./models/commentModel');
const replyModel = require('./models/replyModel');
const testimonialModel = require('./models/testimonialModel');
const locationModel = require('./models/locationModel');

// READ JSON FILES
const users = JSON.parse(fs.readFileSync('./data/Users.json', 'utf-8'));
const groups = JSON.parse(fs.readFileSync('./data/Groups.json', 'utf-8'));
const discussions = JSON.parse(
  fs.readFileSync('./data/Discussions.json', 'utf-8')
);
const photos = JSON.parse(fs.readFileSync('./data/Photos.json', 'utf-8'));
const galleries = JSON.parse(fs.readFileSync('./data/Galleries.json', 'utf-8'));
const albums = JSON.parse(fs.readFileSync('./data/Albums.json', 'utf-8'));
const comments = JSON.parse(fs.readFileSync('./data/Comments.json', 'utf-8'));
const replies = JSON.parse(fs.readFileSync('./data/Replies.json', 'utf-8'));
const testimonials = JSON.parse(
  fs.readFileSync('./data/Testimonials.json', 'utf-8')
);
const locations = JSON.parse(fs.readFileSync('./data/Location.json', 'utf-8'));

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

// IMPORT DATA
const importData = async () => {
  try {
    await userModel.create(users);
    await groupModel.create(groups);
    await discussionModel.create(discussions);
    await photoModel.create(photos);
    await galleryModel.create(galleries);
    await albumModel.create(albums);
    await commentModel.create(comments);
    await replyModel.create(replies);
    await testimonialModel.create(testimonials);
    await locationModel.create(locations);

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
    await groupModel.deleteMany();
    await discussionModel.deleteMany();
    await photoModel.deleteMany();
    await galleryModel.deleteMany();
    await albumModel.deleteMany();
    await commentModel.deleteMany();
    await replyModel.deleteMany();
    await testimonialModel.deleteMany();
    await locationModel.deleteMany();

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
