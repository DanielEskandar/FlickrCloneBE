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

// TESTING: getUserInfo
describe('should retrieve user info by id and send response correctly', () => {
  test('should retrieve user info of Ahmed Abdulkader', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468607a0c',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getUserInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        email: 'ahmedkader99@mailserver.com',
        occupation: 'Photographer',
        hometown: 'Beverly Hills',
        currentCity: 'California',
        country: 'United States',
        joinDate: new Date('2015-10-07T06:09:54.000Z'),
      },
    });
  });

  test('should retrieve user info of Daniel Eskandar', async () => {
    const mReq = {
      params: {
        id: '608d55c7e512b74ee00791db',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getUserInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        email: 'daniel_eskandar99@mailserver.com',
        occupation: 'Artist',
        hometown: 'Ile de France',
        currentCity: 'Paris',
        country: 'France',
        joinDate: new Date('2020-11-03T06:10:45.000Z'),
      },
    });
  });

  test('should send user not found error', async () => {
    const mReq = {
      params: {
        id: '608d55c7e512b74ee0',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getUserInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith({
      status: 'error',
      message: 'No user is found by that user ID',
    });
  });
});

// TESTING: getLimits
describe('should retrieve limits by id and send response correctly', () => {
  test('should retrieve limits of DanielEskandar', async () => {
    const mReq = { headers: { userid: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getLimits(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        limits: {
          photos: {
            maxdisplaypx: 1024,
            maxupload: 15728640,
          },
          videos: {
            maxduration: 90,
            maxupload: 15728640,
          },
        },
      },
    });
  });

  test('should retrieve limits AliaaKhalifa', async () => {
    const mReq = { headers: { userid: '608d55c7e512b74ee00791dc' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getLimits(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        limits: {
          photos: {
            maxdisplaypx: 1024,
            maxupload: 15728640,
          },
          videos: {
            maxduration: 90,
            maxupload: 15728640,
          },
        },
      },
    });
  });
});
