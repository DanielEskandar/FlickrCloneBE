// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// INCLUDE APP
const app = require('./app');

// LISTEN
app.listen(7000, () => {
  console.log('server is running on port 7000');
});

// CONNECT TO DB
mongoose
  .connect(
    'mongodb+srv://Admin:ZA8GqJkq2do6DHQh@cluster0.lolxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('DB connection successful!'))
  .catch(() => console.log('Error connecting to the database!'));
