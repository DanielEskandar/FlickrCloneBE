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
    const mReq = { params: { id: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getDispName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getDispNameData1);
  });

  test('should retrieve display name AliaaKhalifa', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791dc' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getDispName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getDispNameData2);
  });
});

// TESTING: updateDispName
describe('should update display name by id and send response correctly', () => {
  test('should update display name displayname1 to be displayname2', async () => {
    const mReq = {
      user: { id: '60a7fc534e35b60c9c13df79' },
      body: { displayName: 'displayname2' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.updateDispName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.updateDispNameData1);
  });

  test('should fail to update display name displayname2 to be DanielEskandar because the name already exists', async () => {
    const mReq = {
      user: { id: '60a7fc534e35b60c9c13df79' },
      body: { displayName: 'DanielEskandar' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.updateDispName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(userTestData.updateDispNameData2);
  });
});

// TESTING: getRealName
describe('should retrieve real name by id and send response correctly', () => {
  test('should retrieve real name Ahmed Abdulkader', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getRealName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getRealNameData1);
  });

  test('should retrieve real name Mariam Khashab', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791dd' } };
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

  test('should retrieve limits of AliaaKhalifa', async () => {
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

// TESTING: removeTestimonial
describe('should remove a testimonial and send response correctly', () => {
  test('should not remove the testimonial because user does not have permission', async () => {
    const mReq = {
      params: { testimonialId: '60a7b24a66d38d5e20966334' },
      user: { id: '608d55c7e512b74ee00791db' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.removeTestimonial(mReq, mRes);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith(userTestData.presmissionDenied);
  });

  test('should remove a testimonial from Mariam to Nadine', async () => {
    const mReq = {
      params: { testimonialId: '60a7b24a66d38d5e20966334' },
      user: { id: '608d55c7e512b74ee00791dd' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.removeTestimonial(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.dataDeleted);
  });

  test('should remove a testimonial from Nadine to Mariam', async () => {
    const mReq = {
      params: { testimonialId: '60a7b1a07d1e335b00cfbcf9' },
      user: { id: '608d55c7e512b74ee00791dd' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.removeTestimonial(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.dataDeleted);
  });
});

// TESTING: updatePrivacySettings
describe('should update privacy settings by id and send response correctly', () => {
  test('should update privacy settings of DanielEskandar', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791db' },
      body: userTestData.updatePrivacySettingsBody,
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.updatePrivacySettings(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.updatePrivacySettingsData);
  });
});

// TESTING: updateNotificationSettings
describe('should update notification settings by id and send response correctly', () => {
  test('should update notification settings of DanielEskandar', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791db' },
      body: userTestData.updateNotificationSettingsBody,
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.updateNotificationSettings(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(
      userTestData.updateNotificationSettingsData
    );
  });
});

// TESTING: getShowcase
describe('should retrieve user showcase by id and send response correctly', () => {
  test('should retrieve user showcase of AhmedAbdulkader99', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getShowcase(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getShowcaseData);
  });
});

// TESTING: updateShowcase
describe('should update user showcase by id and send response correctly', () => {
  test('should udpate user showcase of AhmedAbdulkader99', async () => {
    const mReq = {
      user: { id: '608d5450ec00005468607a0c' },
      body: userTestData.updateShowcaseBody,
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.updateShowcase(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.updateShowcaseData);
  });
});

// TESTING: updateUserInfo
describe('should update user info and send response correctly', () => {
  test('should update user info of DanielEskandar', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791db' },
      body: {
        occupation: 'Artist',
        hometown: 'Ile de France',
        currentCity: 'Berlin',
        country: 'Germany',
        emailVisibility: 1,
        currentCityVisibility: 2,
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.updateUserInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.udpateUserInfoData);
  });
});

// TESTING: getAboutMe
describe('should retrieve about me section by id and send response correctly', () => {
  test('should about me section of Ahmed Abdulkader', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getAboutMe(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.getAboutMeData);
  });

  test('should send user not found error', async () => {
    const mReq = { params: { id: '608d55c7e512b74ee00791df' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.getAboutMe(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.json).toBeCalledWith(userTestData.userNotFound);
  });
});

// TESTING: updateAboutMe
describe('should update about me section by id and send response correctly', () => {
  test('should update about me section of aboutMeTestUser', async () => {
    const mReq = {
      user: { id: '60aa4e716d75141ac811cf2e' },
      body: { aboutMe: 'new about me content' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.updateAboutMe(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(userTestData.updateAboutMeData);
  });
});
