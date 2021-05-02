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
    send: jest.fn().mockReturnThis(),
  };
  await userController.getDispName(mReq, mRes);
  expect(mRes.status).toBeCalledWith(200);
  expect(mRes.send).toBeCalledWith({
    status: 'success',
    data: {
      displayName: 'DanielEskandar',
    },
  });
});

test('should retrieve display name by id and send response correctly', async () => {
  const mReq = { headers: { userid: '608d55c7e512b74ee00791dc' } };
  const mRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  await userController.getDispName(mReq, mRes);
  expect(mRes.status).toBeCalledWith(200);
  expect(mRes.send).toBeCalledWith({
    status: 'success',
    data: {
      displayName: 'AliaaKhalifa',
    },
  });
});

test('should retrieve real name by id and send response correctly', async () => {
  const mReq = {
    headers: {
      userid: '608d5450ec00005468607a0c',
    },
  };
  const mRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  await userController.getRealName(mReq, mRes);
  expect(mRes.status).toBeCalledWith(200);
  expect(mRes.send).toBeCalledWith({
    status: 'success',
    data: {
      firstName: 'Ahmed',
      lastName: 'Abdulkader',
    },
  });
});

test('should retrieve real name by id and send response correctly', async () => {
  const mReq = {
    headers: {
      userid: '608d55c7e512b74ee00791dd',
    },
  };
  const mRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  await userController.getRealName(mReq, mRes);
  expect(mRes.status).toBeCalledWith(200);
  expect(mRes.send).toBeCalledWith({
    status: 'success',
    data: {
      firstName: 'Mariam',
      lastName: 'Khashab',
    },
  });
});
