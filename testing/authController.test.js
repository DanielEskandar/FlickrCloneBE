// INCLUDE CONTROLLER TO TEST
const authController = require('../controllers/authController.js');

// INCLUDE TEST DATA
const authTestData = require('./test_data/authTestData.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// INIT TEST COMMONS
headers.initTesting();

// TESTING: signUp
describe('should perform signup operation for a new user', () => {
  test('should not sign up the user because of invalid age', async () => {
    const mReq = {
      body: {
        firstName: 'First Name Test',
        lastName: 'Last Name Test',
        displayName: 'firstlast',
        age: 10,
        email: 'first.last@email.com',
        password: 'Abcdef@1',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signUp(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(authTestData.signupTestData1);
  });

  test('should not sign up the user because of invalid email', async () => {
    const mReq = {
      body: {
        firstName: 'First Name Test',
        lastName: 'Last Name Test',
        displayName: 'firstlast',
        age: 21,
        email: 'first.last@@email.com',
        password: 'Abcdef@1',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signUp(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(authTestData.signupTestData2);
  });

  test('should not sign up the user because of invalid password', async () => {
    const mReq = {
      body: {
        firstName: 'First Name Test',
        lastName: 'Last Name Test',
        displayName: 'firstlast',
        age: 21,
        email: 'first.last@email.com',
        password: 'Abcdef',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signUp(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(authTestData.signupTestData3);
  });

  test('should perform signup and login operations for a new user', async () => {
    const mReq = {
      body: {
        firstName: 'First Name Test',
        lastName: 'Last Name Test',
        displayName: 'firstlast',
        age: 21,
        email: 'first.last@email.com',
        password: 'Abcdef@1',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signUp(mReq, mRes);
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.json).toBeCalledWith(authTestData.signupTestData5);
  });

  test('should not sign up a user that already exists', async () => {
    const mReq = {
      body: {
        firstName: 'First Name Test',
        lastName: 'Last Name Test',
        displayName: 'firstlast',
        age: 21,
        email: 'first.last@email.com',
        password: 'Abcdef@1',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signUp(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(authTestData.signupTestData6);
  });
});
