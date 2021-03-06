// INCLUDE CONTROLLER TO TEST
const galleryController = require('../controllers/galleryController.js');
const commentModel = require('../models/commentModel');
const galleryModel = require('../models/galleryModel');

// INCLUDE TEST DATA
const galleryTestData = require('./test_data/galleryTestData.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// INIT TEST COMMONS
headers.initTesting();

// TESTING: getInfo
describe("should retrieve Gallery's Info by id and send response correctly", () => {
  test(`should retrieve Gallery Info`, async () => {
    jest.setTimeout(30000);
    const mReq = { params: { id: '608f34a634413f11f020b127' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.getInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.getInfoData);
  });
});

// TESTING: getPhotos
describe("should retrieve Gallery's Photos", () => {
  test(`should retrieve Gallery's Photos with length 2`, async () => {
    const mReq = { params: { id: '608f34a634413f11f020b127' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.getPhotos(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.getPhotosData);
  });
});

// TESTING: getComments
describe('should get Comments in a gallery', () => {
  test(`should get Comments in a gallery with id 608f34a634413f11f020b124`, async () => {
    const mReq = { params: { id: '608f34a634413f11f020b124' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.getCommentsData);
  });
});

// TESTING: editComments
describe('should edit a comment in a gallery', () => {
  test(`should edit a Comments with id 6090beb07237ad1fb4458fae`, async () => {
    const mReq = {
      user: { id: '608d5450ec00005468607a0c' },
      params: { id: '6090beb07237ad1fb4458fae' },
      body: { body: 'I like it' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.editCommentData);
  });
});

// TESTING: addComments
describe('should Add a comment to a gallery', () => {
  test(`should Add a comment to a gallery with id 608f34a634413f11f020b121`, async () => {
    // delete any comment with 5590beb07237ad1fb4458fae
    await commentModel.findByIdAndDelete('5590beb07237ad1fb4458fae');
    const mReq = {
      user: { id: '608d5450ec00005468607a0c' },
      params: { id: '608f34a634413f11f020b121' },
      body: {
        _id: '5590beb07237ad1fb4458fae',
        date: '2021-05-04T18:21:34.924Z',
        body: 'good one',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.addCommentData);
  });
});

// TESTING: deleteComments
describe('should delete a comment from a gallery', () => {
  test(`should delete a comment from a gallery with id 608f34a634413f11f020b121`, async () => {
    const mReq = {
      user: { id: '608d5450ec00005468607a0c' },
      params: {
        id: '608f34a634413f11f020b121',
        commentid: '4590be955537ad1fb4458f11',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(galleryTestData.successResponse);
  });
});

// TESTING: createGallery
describe('should Create a gallery', () => {
  test(`should Create a gallery with id 708f34a634413f11f020b139`, async () => {
    // delete any gallery with 708f34a634413f11f020b139
    await galleryModel.findByIdAndDelete('708f34a634413f11f020b139');
    const mReq = {
      user: { id: '608d5450ec00005468607a11' },
      body: {
        _id: '708f34a634413f11f020b139',
        galleryName: 'Egypt',
        createdAt: '2021-05-03T00:07:30.005Z',
        updatedAt: '2021-05-03T00:07:30.005Z',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.createGallery(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.createAlbumData);
  });
});

// TESTING: addPhoto
describe('should add Photo to a gallery', () => {
  test(`should should add Photo to a gallery id 608f34a634413f11f020b12a`, async () => {
    const mReq = {
      params: { id: '608f34a634413f11f020b12a' },
      user: { id: '608d5450ec00005468607a11' },
      body: {
        _id: '608d5560ec0000546860000e',
        photoID: '608d5560ec00005468607a0e',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.addPhoto(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.addPhoto);
  });
});

// TESTING: removePhoto
describe('should delete a photo from a gallery', () => {
  test(`should delete a photo from a gallery with id 608f34a634413f11f020b124`, async () => {
    const mReq = {
      user: { id: '608d5450ec00005468607a11' },
      params: {
        id: '608f34a634413f11f020b124',
        photoid: '608d5450ec00005468607a0f',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.removePhoto(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(galleryTestData.successResponse);
  });
});

// TESTING: editMeta
describe('should edit meta of a gallery', () => {
  test(`should edit meta of a gallery with id 608f34a634413f11f020b124`, async () => {
    const mReq = {
      user: { id: '608d5450ec00005468607a11' },
      params: {
        id: '608f34a634413f11f020b124',
      },
      body: { galleryName: 'TEST edit Meta' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.editMeta(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.editMeta);
  });
});

// TESTING: setPrimaryPhoto
describe('should set Primary Photo of a gallery', () => {
  test(`should set Primary Photo of a gallery with id 608f34a634413f11f020b127`, async () => {
    const mReq = {
      user: { id: '608d5450ec00005468607a11' },
      params: {
        id: '608f34a634413f11f020b127',
        photoid: '608d5450ec00005468607a0f',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await galleryController.setPrimaryPhoto(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(galleryTestData.setPrimaryPhoto);
  });
});
