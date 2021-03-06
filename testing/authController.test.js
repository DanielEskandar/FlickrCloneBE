// INCLUDE CONTROLLER TO TEST
const authController = require('../controllers/authController.js');

// INCLUDE USER MODEL
const userModel = require('../models/userModel.js');

// INCLUDE TEST DATA
const authTestData = require('./test_data/authTestData.js');
const tokens = require('./test_data/tokens.js');

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
    expect(mRes.json).toBeCalledWith(authTestData.signupData1);
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
    expect(mRes.json).toBeCalledWith(authTestData.signupData2);
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
    expect(mRes.json).toBeCalledWith(authTestData.signupData3);
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
    expect(mRes.json).toBeCalledWith(authTestData.signupData4);
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
    expect(mRes.json).toBeCalledWith(authTestData.signupData5);
  });
});

// TESTING: signIn
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
    expect(mRes.json).toBeCalledWith(authTestData.signinData1);
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
    expect(mRes.json).toBeCalledWith(authTestData.signinData1);
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
    expect(mRes.json).toBeCalledWith(authTestData.signinData2);
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
    expect(mRes.json).toBeCalledWith(authTestData.signinData3);
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
    expect(mRes.json).toBeCalledWith(authTestData.signinData4);
  });
});

// TESTING: protect
describe('should protect routes successfully by verifyin tokens', () => {
  test('should not allow access because no token is sent', async () => {
    const mReq = { headers: {} };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const mNext = jest.fn().mockReturnThis();
    await authController.protect(mReq, mRes, mNext);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(authTestData.protectData1);
  });

  test('should not allow access because of invalid token', async () => {
    const mReq = { headers: { authorization: tokens.ProtectUserInvalidToken } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const mNext = jest.fn().mockReturnThis();
    await authController.protect(mReq, mRes, mNext);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(authTestData.protectData2);
  });

  test('should not allow access because of expired token', async () => {
    const mReq = { headers: { authorization: tokens.ProtectUserExpiredToken } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const mNext = jest.fn().mockReturnThis();
    await authController.protect(mReq, mRes, mNext);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(authTestData.protectData3);
  });

  test('should not allow access because password has been changed after token generation', async () => {
    const mReq = {
      headers: {
        authorization: tokens.ProtectUserValidTokenBeforePasswordChanged,
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const mNext = jest.fn().mockReturnThis();
    await authController.protect(mReq, mRes, mNext);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(authTestData.protectData4);
  });

  test('should allow access because token is valid', async () => {
    const mReq = { headers: { authorization: tokens.ProtectUserValidToken } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const mNext = jest.fn().mockReturnThis();
    await authController.protect(mReq, mRes, mNext);
    expect(mNext).toBeCalledWith();
  });

  test('should not allow access because user has been deleted after token genration', async () => {
    const mReq = { headers: { authorization: tokens.ProtectUserValidToken } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const mNext = jest.fn().mockReturnThis();
    await userModel.findByIdAndDelete({ _id: '60a6488ac7a8605758f0476a' });
    await authController.protect(mReq, mRes, mNext);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(authTestData.protectData5);
  });
});

// TESTING: forgotPassword
describe('should send password reset email to user', () => {
  test('should not send email because the user does not exist', async () => {
    const mReq = {
      body: {
        email: 'agf@gmail.com',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.forgotPassword(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.json).toBeCalledWith(authTestData.userNotFound);
  });

  test('should reset email to danielbassem@gmail.com', async () => {
    const mReq = {
      body: {
        email: 'danielbassem@gmail.com',
      },
      get: jest.fn().mockReturnThis(),
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.forgotPassword(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(authTestData.forgotPasswordData);
  });
});

// TESTING: resetPassword
describe('should reset user password', () => {
  test('should not reset user password because token has expired', async () => {
    const mReq = authTestData.resetPasswordReq1;
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.resetPassword(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(authTestData.resetPasswordData1);
  });

  test('should reset reset user password of resetPasswordValidUser', async () => {
    const mReq = authTestData.resetPasswordReq2;
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.resetPassword(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(authTestData.resetPasswordData2);
  });
});

// TESTING: updatePassword
describe('should perform update password operation correctly and send response', () => {
  test('should not update user password because current password is incorrect', async () => {
    const mReq = {
      user: { id: '60aeea748d222150c8dbaaf1' },
      body: {
        passwordCurrent: 'Abdcdef!',
        password: 'Abdcdef!1',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.updatePassword(mReq, mRes);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(authTestData.updatePasswordData1);
  });

  test('should not update user password because new password is weak', async () => {
    const mReq = {
      user: { id: '60aeea748d222150c8dbaaf1' },
      body: {
        passwordCurrent: 'Abdcdef!1',
        password: 'Abdcdef!',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.updatePassword(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(authTestData.updatePasswordData2);
  });

  test('should update password of updatePasswordTestUser', async () => {
    const mReq = {
      user: { id: '60aeea748d222150c8dbaaf1' },
      body: {
        passwordCurrent: 'Abdcdef!1',
        password: 'Abdcdef!2',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await authController.updatePassword(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(authTestData.updatePasswordData3);
  });
});
