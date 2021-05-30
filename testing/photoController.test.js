// INCLUDE CONTROLLER TO TEST
const photoController = require('../controllers/photoController.js');

// INCLUDE TEST DATA
const photoTestData = require('./test_data/photoTestData.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// INIT TEST COMMONS
headers.initTesting();

// TESTING: getFavourites
describe('should retrieve number of times photo was favourited', () => {
  test('should retrieve favourites = 7', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getFavourites(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getFavouritesData1);
  });

  test('should retrieve favourites = 51', async () => {
    const mReq = { params: { id: '608d5450ec00005468617a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getFavourites(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getFavouritesData2);
  });
});

// TESTING: getInformation
describe('should retrieve photo information', () => {
  test('should retrieve sizes, comment, favourites, views, tags, date uploaded, date taken, location, title description, exif, content type and people tagged.', async () => {
    const mReq = {
      params: {
        id: '604d5450ec00005468617a0c',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getInformation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getInformationData1);
  });
});

// TESTING: getInformation
describe('should retrieve photo information', () => {
  test('should retrieve sizes, comment, favourites, views, tags, date uploaded, date taken, location, title description, exif, content type and people tagged.', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468617a0c',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getInformation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getInformationData2);
  });
});

// TESTING: getComments
describe('should retrieve the comments on a photo (their IDs)', () => {
  test('should retrieve IDs 604d5450ec00005468617a0c', async () => {
    const mReq = { params: { id: '604d5450ec00005468617a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getCommentsData1);
  });
});

describe('should retrieve the comments on a photo (their IDs)', () => {
  test('should retrieve IDs 608d5450ec00005468607a0f', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468607a0f' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getCommentsData2);
  });
});

// TESTING ADD COMMENT
describe('should add comments on a photo', () => {
  test('should retrieve information about new comment', async () => {
    const mReq = {
      params: { id: '604d5450ec00005468617a0c' },
      body: {
        body: 'Unit testing comment',
        userId: '608d55c7e512b74ee00791db',
        date: '2021-05-04T14:07:48.071Z',
        _id: '508d55c7e512b74ee00791db',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addCommentData1);
  });
});

describe('should add comments on a photo', () => {
  test('should retrieve information about new comment', async () => {
    const mReq = {
      params: { id: '604d5450ec00005468617a0c' },
      body: {
        body: 'Comment to add by photo testing',
        userId: '608d55c7e512b74ee00791db',
        date: '2021-05-04T14:07:48.071Z',
        _id: '508d55c7e512b74ee00891db',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addCommentData2);
  });
});

// EDIT COMMENT
describe('should edit comments on a photo', () => {
  test('should edit comment 6090c346c555f920e121f205', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791db' },
      params: { id: '6090c346c555f920e121f205' },
      body: {
        body: 'Nice angle, edit comment test',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.editCommentData1);
  });
});

describe('should edit comments on a photo', () => {
  test('should edit comment 6001c346c555f920e111f205', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791db' },
      params: { id: '6001c346c555f920e111f205' },
      body: {
        body: 'Edited successfully',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.editCommentData2);
  });
});

//TESTING GET SIZES
describe('should retrieve all sizes of a photo', () => {
  test('should retrieve sizes of photo 608d5450ec00005468607a0f', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getSizes(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getSizesData1);
  });
});

describe('should retrieve all sizes of a photo', () => {
  test('should retrieve sizes of photo 608d5450ec00005468607a0f', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getSizes(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getSizesData1);
  });
});

// TESTING SET TAGS
describe('should set a tag on a photo', () => {
  test('should set tag Unittesttag1', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b5d' },
      body: {
        tags: ['Unittesttag1', 'Unit', 'Test', 'Tag'],
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.setTags(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.setTagData1);
  });
});

describe('should set a tag on a photo', () => {
  test('should set tag MirrorlessCamera', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b4d' },
      body: {
        tags: ['MirrorlessCamera', 'LowExposure'],
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.setTags(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.setTagData2);
  });
});

// TESTING DELETE TAG
describe('should delete a tag', () => {
  test('should delete tags beauty', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791dc' },
      params: {
        id: '608d5450ec00005468628b2d',
      },
      body: {
        tags: 'beauty',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.removeTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.removeTag1);
  });
});

describe('should delete a tag on a photo', () => {
  test('should delete tag light', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791dc' },
      params: {
        id: '608d5450ec00005468628b2d',
      },
      body: {
        tags: 'light',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.removeTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.removeTag2);
  });
});

// TESTING ADD TAG
describe('should add a tag on a photo', () => {
  test('should add tag AddingTag', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b6d' },
      body: {
        tags: 'AddingTag',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.addTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addTagData1);
  });
});

describe('should add a tag on a photo', () => {
  test('should add tag Skyline', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b6d' },
      body: {
        tags: 'Skyline',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.addTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addTagData2);
  });
});

// EDIT PHOTO INFO
describe('should edit photo info', () => {
  test('should edit photo info with id 608d5450ec00005468628a0d', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      user: { id: '608d55c7e512b74ee00791dc' },
      body: {
        title: 'Test Edit Info',
        description: 'New description for testing',
        tags: ['#Test', '#FlickrClonoe'],
        dateUploaded: '2020-11-03T06:10:45+00:00',
        dateTaken: '2019-11-03T06:10:45+00:00',
        permissions: {
          public: 0,
          friend: 1,
          family: 1,
          comment: 2,
          addMeta: 2,
        },
        license: 2,
        safetyLevel: 1,
        contentType: 'Photo',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.editPhotoInformation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.editPhotoInfo);
  });
});

// get GalleriesforPhoto
describe('should  get Galleries for Photo', () => {
  test('should get Galleries for Photo with id 608d5450ec00005468628a0d', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      body: {
        per_page: 3,
        page: 1,
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getGalleriesforPhoto(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getGalleriesforPhoto);
  });
});

// TESTING DELETE COMMENT
describe('should delete a comment', () => {
  test('should delete comment with ID 608d5450ec00005468629b3d', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791dc' },
      params: {
        id: '608d5450ec00005468628b2d',
        commentid: '608d5450ec00005468629b3d',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(photoTestData.deleteCommentData);
  });
});

describe('should delete a comment', () => {
  test('should delete comment with ID 608d5450ec00005468629b3d', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791dc' },
      params: {
        id: '608d5450ec00005468628b2d',
        commentid: '608d5450ec00005468629b4d',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(photoTestData.deleteCommentData);
  });
});

// TESTING: getTagged
describe('should retrieve tagged people in a photo', () => {
  test('should retrieve 1 tagged user', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getTagged(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getTaggedData);
  });
});

//TESTING TAG USER
describe('should tag a user to the photo ', () => {
  test('should retrieve 2 tagged users', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468607a0f',
        userid: '608d55c7e512b74ee00791dc',
      },
      user: { id: '608d55c7e512b74ee00791de' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.tagUser(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.tagUserData);
  });
});

//TESTING REMOVE TAGGED USER
describe('should remove a tagged user from the photo ', () => {
  test('should retrieve 1 tagged users', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468607a0f',
        userid: '608d55c7e512b74ee00791dc',
      },
      user: { id: '608d55c7e512b74ee00791de' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.removePerson(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.removePersonData);
  });
});
