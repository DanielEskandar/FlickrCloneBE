// INCLUDE CONTROLLER TO TEST
const userController = require('../controllers/userController.js');

// INCLUDE TEST DATA
const userTestData = require('./test_data/userTestData.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// INIT TEST COMMONS
headers.initTesting();

// TESTING: getDispName
describe('should retrieve display name by id and send response correctly', () => {
  test('should retrieve display name DanielEskandar', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getDispName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getDispNameData1);
  });

  test('should retrieve display name AliaaKhalifa', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791dc' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getDispName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getDispNameData2);
  });
});

// TESTING: getRealName
describe('should retrieve real name by id and send response correctly', () => {
  test('should retrieve real name Ahmed Abdulkader', async () => {
    const mReq = { user: { id: '608d5450ec00005468607a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getRealName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getRealNameData1);
  });

  test('should retrieve real name Mariam Khashab', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791dd' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getRealName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getRealNameData2);
  });
});

// TESTING: getUserInfo
describe('should retrieve user info by id and send response correctly', () => {
  test('should retrieve user info of Ahmed Abdulkader', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getUserInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getUserInfoData1);
  });

  test('should retrieve user info of Daniel Eskandar', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getUserInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getUserInfoData2);
  });

  test('should send user not found error', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791df' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getUserInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.json).toBeCalledWith(userTestData.userNotFound);
  });
});

// TESTING: getLimits
describe('should retrieve limits by id and send response correctly', () => {
  test('should retrieve limits of DanielEskandar', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getLimits(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getLimitsData1);
  });

  test('should retrieve limits AliaaKhalifa', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791dc' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getLimits(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getLimitsData2);
  });
});

// TESTING: getFollowing
describe('should retrieve following list of a user and send response correctly', () => {
  test('should retrieve following list of NadineMagdy', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791de' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getFollowing(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getFollowingData1);
  });

  test('should retrieve following list of AhmedAbdulkader99', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getFollowing(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getFollowingData2);
  });

  test('should send user not found error', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791df' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getFollowing(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.json).toBeCalledWith(userTestData.userNotFound);
  });
});

// TESTING: getBlocked
describe('should retrieve blocked list of a user and send response correctly', () => {
  test('should retrieve blocked list of DanielEskandar', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getBlocked(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getBlockedData1);
  });

  test('should retrieve blocked list of AliaaKhalifa', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791dc' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getBlocked(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getBlockedData2);
  });
});

// TESTING: getFaves
describe('should retrieve faves by id and send response correctly', () => {
  test('should retrieve faves of Ahmed Abdulkader', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getFaves(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getFavesData1);
  });

  test('should retrieve faves of Daniel Eskandar', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getFaves(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getFavesData2);
  });
});

// TESTING: addToFaves
describe('should add image to faves by id and send response correctly', () => {
  test('add an image to faves of Ahmed Abdulkader', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      user: { id: '608d5450ec00005468607a0c' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.addFave(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.addFavesData1);
  });

  test('add an image to faves of Daniel Eskandar', async () => {
    const mReq = {
      params: { id: '604d5450ec00005468617a0c' },
      user: { id: '608d55c7e512b74ee00791db' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.addFave(mReq, mRes);
    expect(mRes.status).toBeCalledWith(409);
    expect(mRes.json).toBeCalledWith(userTestData.addFavesData2);
  });

  test('add an image to faves of Daniel Eskandar', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      user: { id: '608d55c7e512b74ee00791db' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.addFave(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.addFavesData3);
  });
});

// TESTING: removeFromFaves
describe('should remove image from faves by id and send response correctly', () => {
  test('remove image from faves faves of Ahmed Abdulkader', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      user: { id: '608d5450ec00005468607a0c' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.removeFave(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.removeFavesData1);
  });

  test('remove image from faves of Ahmed Abdulkader', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      user: { id: '608d5450ec00005468607a0c' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.removeFave(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.json).toBeCalledWith(userTestData.removeFavesData2);
  });

  test('remove image from faves of Daniel Eskandar', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      user: { id: '608d55c7e512b74ee00791db' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.removeFave(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.removeFavesData3);
  });
});

// TESTING: getNotificationSettings
describe('should retrieve notification settings by id and send response correctly', () => {
  test('should retrieve notification settings of DanielEskandar', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getNotificationSettings(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getNotificationSettingsData1);
  });

  test('should retrieve notification settings of AliaaKhalifa', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791dc' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getNotificationSettings(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getNotificationSettingsData2);
  });
});

// TESTING: getPrivacySettings
describe('should retrieve privacy settings by id and send response correctly', () => {
  test('should retrieve privacy settings of DanielEskandar', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getPrivacySettings(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getPrivacySettingsData1);
  });

  test('should retrieve privacy settings of AliaaKhalifa', async () => {
    const mReq = { user: { id: '608d55c7e512b74ee00791dc' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getPrivacySettings(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getPrivacySettingsData2);
  });
});

// TESTING: getTestimonials
describe('should retrieve testimonials of a user and send response correctly', () => {
  test('should retrieve following list of the testimonial test user', async () => {
    const mReq = { params: { id: '60a787449065c85bac893ab3' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getTestimonials(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getTestimonialsData);
  });
});

// TESTING: addTestimonial
describe('should add a testimonial to a user and send response correctly', () => {
  test('should add a testimonial from Alia to testimonial test user', async () => {
    const mReq = {
      params: { id: '60a787449065c85bac893ab3' },
      body: {
        message: 'A testimonial from Alia',
      },
      user: { id: '608d55c7e512b74ee00791dc' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.addTestimonial(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.addTestimonialData);
  });

  test('should not add a testimonial because user does not exist', async () => {
    const mReq = {
      params: { id: '60a787449065c85bac893ab2' },
      body: {
        message: 'A testimonial from Alia',
      },
      user: { id: '608d55c7e512b74ee00791dc' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.addTestimonial(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.json).toBeCalledWith(userTestData.userNotFound);
  });
});
