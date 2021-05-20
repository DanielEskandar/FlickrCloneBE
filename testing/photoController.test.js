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

// TESTING DELETE COMMENT
describe('should delete a comment', () => {
  test('should delete comment on 604d5450ec01005468617a04 with ID 6091c557d6c7ec6b48c51e60', async () => {
    const mReq = {
      params: {
        id: '604d5450ec01005468617a04',
        commentid: '6091c557d6c7ec6b48c51e60',
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
  test('should set tag Unit Test Tag!', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b1d' },
      body: {
        tags: 'Unit test tag 1',
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
      params: { id: '608d5450ec00005468628b1d' },
      body: {
        tags: 'MirrorlessCamera',
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

// TESTING DELETE COMMENT
describe('should delete a tags', () => {
  test('should delete tags #Sakure on ', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468628b1d',
      },
      body: {
        tags: '#Nihon',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.removeTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(photoTestData.removeTag);
  });
});

describe('should delete a tags', () => {
  test('should delete tags #Nihon on ', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468628b1d',
      },
      body: {
        tags: '#Sakure',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.removeTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(photoTestData.removeTag);
  });
});

// TESTING ADD TAG
describe('should add a tag on a photo', () => {
  test('should add tag Adding Tag!', async () => {
    const mReq = {
      params: { id: '604d5450ec00005468617a0c' },
      body: {
        tags: 'Adding Tag',
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
      params: { id: '608d5450ec00005468628b1d' },
      body: {
        tags: 'Skyline',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.setTags(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addTagData2);
  });
});
