// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userController = require('../controllers/userController.js');

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

test('should retrieve display name by id and send response correctly', async () => {
  const mReq = { headers: { userid: '608d55c7e512b74ee00791db' } };
  const mRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  await userController.getDispName(mReq, mRes);
  expect(mRes.status).toBeCalledWith(200);
  expect(mRes.json).toBeCalledWith({
    status: 'success',
    data: {
      displayName: 'DanielEskandar',
    },
  });
});
