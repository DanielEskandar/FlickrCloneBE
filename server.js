// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
app.listen(PORT, () => {
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
  .then(() => console.log('DB connection successful!'))
  .catch(() => console.log('Error connecting to the database!'));

const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://MainUser:<password>@cluster0.pms75.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});
