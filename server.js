const mongoose = require("mongoose");
const app = require("./app");

const server = app.listen(7000, () => {
  console.log("server is running on port 7000");
});

mongoose
  .connect(
    "mongodb+srv://Admin:ZA8GqJkq2do6DHQh@cluster0.lolxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connection successful!"))
  .catch(() => console.log("Error connecting to the database!"));
