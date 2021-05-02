// INCLUDE CONTROLLER TO TEST
const userController = require('../controllers/userController.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testcommons.js');

// TESTING: getDispName
describe('should retrieve display name by id and send response correctly', () => {
  test('should retrieve display name DanielEskandar', async () => {
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

  test('should retrieve display name AliaaKhalifa', async () => {
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
});

// TESTING: getRealName
describe('should retrieve real name by id and send response correctly', () => {
  test('should retrieve real name Ahmed Abdulkader', async () => {
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

  test('should retrieve real name Mariam Khashab', async () => {
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
});
