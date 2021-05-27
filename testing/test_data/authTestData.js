module.exports.userNotFound = {
  status: 'fail',
  message: 'No user is found by that email',
};

module.exports.signupData1 = {
  status: 'fail',
  message: 'Invalid input data. Minimum age is 13',
};

module.exports.signupData2 = {
  status: 'fail',
  message: 'Invalid input data. Invalid email address',
};

module.exports.signupData3 = {
  status: 'fail',
  message: 'Invalid input data. Weak password',
};

module.exports.signupData4 = {
  status: 'success',
  token: expect.any(String),
  data: {
    user: {
      _id: expect.any(String),
    },
  },
};

module.exports.signupData5 = {
  status: 'fail',
  message: 'Duplicate field value "firstlast". Please use another value',
};

module.exports.signinData1 = {
  status: 'fail',
  message: 'Please provide email and password',
};

module.exports.signinData2 = {
  status: 'fail',
  message: 'Invalid Email',
};

module.exports.signinData3 = {
  status: 'fail',
  message: 'Invalid Password',
};

module.exports.signinData4 = {
  status: 'success',
  token: expect.any(String),
  data: {
    user: {
      _id: '608d55c7e512b74ee00791db',
    },
  },
};

module.exports.protectData1 = {
  status: 'fail',
  message: 'You are not logged in. Please log in to get access.',
};

module.exports.protectData2 = {
  status: 'fail',
  message: 'Invalid token. Please log in again.',
};

module.exports.protectData3 = {
  status: 'fail',
  message: 'Your token has expired. Please log in again',
};

module.exports.protectData4 = {
  status: 'fail',
  message: 'User changed password recently. Please log in again.',
};

module.exports.protectData5 = {
  status: 'fail',
  message: 'The user belonging to this token does not exist',
};

module.exports.forgotPasswordData = {
  status: 'success',
  message: 'Token sent to email',
};

module.exports.resetPasswordReq1 = {
  body: {
    password: 'Abcdef@1',
  },
  params: {
    token: 'c20171c2aa2a4530e21cb15fe56d336a236879fa478197b1492303369c364a2d',
  },
};

module.exports.resetPasswordData1 = {
  status: 'fail',
  message: 'Token is invalid or has expired',
};

module.exports.resetPasswordReq2 = {
  body: {
    password: 'Abcdef@1',
  },
  params: {
    token: '1c0104400229d67cc760a4f951715507d805b1d58267c0f6a57a2e10dcd2d02d',
  },
};

module.exports.resetPasswordData2 = {
  status: 'success',
  token: expect.any(String),
  data: {
    user: {
      _id: '60aeb7c7824d05334c309754',
    },
  },
};

module.exports.updatePasswordData1 = {
  status: 'fail',
  message: 'Your current password is wrong.',
};

module.exports.updatePasswordData2 = {
  status: 'fail',
  message: 'Invalid input data. Weak password',
};

module.exports.updatePasswordData3 = {
  status: 'success',
  token: expect.any(String),
  data: {
    user: {
      _id: '60aeea748d222150c8dbaaf1',
    },
  },
};
