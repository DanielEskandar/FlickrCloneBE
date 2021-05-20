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

describe('should perform login operation successfully', () => {
  test('should not login user because body does not contain email', async () => {
    const mReq = {
      body: {
        password: 'ViveLaFrance&45',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signIn(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(authTestData.signinTestData1);
  });

  test('should not login user because body does not contain password', async () => {
    const mReq = {
      body: {
        email: 'daniel_eskandar99@mailserver.com',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signIn(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(authTestData.signinTestData1);
  });

  test('should not login user because of invalid email', async () => {
    const mReq = {
      body: {
        email: 'ddaniel_eskandar99@mailserver.com',
        password: 'ViveLaFrance&45',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signIn(mReq, mRes);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(authTestData.signinTestData2);
  });

  test('should not login user because of invalid password', async () => {
    const mReq = {
      body: {
        email: 'daniel_eskandar99@mailserver.com',
        password: 'vViveLaFrance&45',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signIn(mReq, mRes);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(authTestData.signinTestData3);
  });

  test('should login user successfully', async () => {
    const mReq = {
      body: {
        email: 'daniel_eskandar99@mailserver.com',
        password: 'ViveLaFrance&45',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.signIn(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(authTestData.signinTestData4);
  });
});
