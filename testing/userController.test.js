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

// TESTING: getFollowing
describe('should retrieve following list of a user and send response correctly', () => {
  test('should retrieve following list of NadineMagdy', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791de' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getFollowing(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      count: 4,
      data: {
        _id: '608d55c7e512b74ee00791de',
        following: [
          {
            _id: '60914e1ba87d736f3c382ed6',
            user: {
              _id: '608d55c7e512b74ee00791db',
              displayName: 'DanielEskandar',
              firstName: 'Daniel',
              lastName: 'Eskandar',
            },
            relation: 'undetermined',
            followDate: '2021-05-04T12:16:24.255Z',
          },
          {
            _id: '60914e1ba87d736f3c382ed7',
            user: {
              _id: '608d5450ec00005468607a0c',
              displayName: 'AhmedAbdulkader99',
              firstName: 'Ahmed',
              lastName: 'Abdulkader',
            },
            relation: 'undetermined',
            followDate: '2021-05-04T12:17:24.255Z',
          },
          {
            _id: '60914e1ba87d736f3c382ed8',
            user: {
              _id: '608d55c7e512b74ee00791dc',
              displayName: 'AliaaKhalifa',
              firstName: 'Aliaa',
              lastName: 'Khalifa',
            },
            relation: 'undetermined',
            followDate: '2021-05-04T12:18:24.255Z',
          },
          {
            _id: '60914e1ba87d736f3c382ed9',
            user: {
              _id: '608d55c7e512b74ee00791dd',
              displayName: 'MariamKhashab',
              firstName: 'Mariam',
              lastName: 'Khashab',
            },
            relation: 'undetermined',
            followDate: '2021-05-04T12:19:24.255Z',
          },
        ],
      },
    });
  });

  test('should retrieve following list of AhmedAbdulkader99', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getFollowing(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      count: 1,
      data: {
        _id: '608d5450ec00005468607a0c',
        following: [
          {
            _id: '60914e1ba87d736f3c382ece',
            user: {
              _id: '608d55c7e512b74ee00791dc',
              displayName: 'AliaaKhalifa',
              firstName: 'Aliaa',
              lastName: 'Khalifa',
            },
            relation: 'friend',
            followDate: '2021-05-04T12:12:24.255Z',
          },
        ],
      },
    });
  });

  test('should send user not found error', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getFollowing(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith({
      status: 'error',
      message: 'No user is found by that user ID',
    });
  });
});
