// INCLUDE CONTROLLER TO TEST
const albumController = require('../controllers/albumController.js');
const commentModel = require('../models/commentModel');
const albumModel = require('../models/albumModel');

// INCLUDE TEST DATA
const albumTestData = require('./test_data/albumTestData.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// INIT TEST COMMONS
headers.initTesting();

// TESTING: getInfo
describe("should retrieve Album's Info by id and send response correctly", () => {
  test(`should retrieve Album Info`, async () => {
    jest.setTimeout(30000);
    const mReq = { params: { id: '608f3c70197abc18509aec5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.getInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(albumTestData.getInfoData);
  });
});

// TESTING: getPhotos
describe("should retrieve Album's Photos", () => {
  test(`should retrieve Album's Photos with length 2`, async () => {
    const mReq = { params: { id: '608f3c70197abc18509aec5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.getPhotos(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(albumTestData.getPhotosData);
  });
});

// TESTING: getComments
describe('should get Comments in an album', () => {
  test(`should get Comments in an album with id 608f3c70197abc18509aec60`, async () => {
    const mReq = { params: { id: '608f3c70197abc18509aec60' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(albumTestData.getCommentsData);
  });
});

// TESTING: editComments
describe('should edit a comment in an album', () => {
  test(`should edit a Comments with id 6090ca99f002f5466cd8485b`, async () => {
    const mReq = {
      params: { id: '6090ca99f002f5466cd8485b' },
      body: { body: 'family is everything <3' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(albumTestData.editCommentData);
  });
});

// // TESTING: addComments
describe('should Add a comment to an album', () => {
  test(`should Add a comment to an album with id 608f3c70197abc18509aec61`, async () => {
    // delete any comment with 5590beb07237ad1fb4458fae
    await commentModel.findByIdAndDelete('1190beb07237ad1fb4458fae');
    const mReq = {
      params: { id: '608f3c70197abc18509aec61' },
      body: {
        _id: '1190beb07237ad1fb4458fae',
        userId: '608d5450ec00005468607a0c',
        date: '2021-05-04T18:21:34.924Z',
        body: 'GREAT SHOTS!',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(albumTestData.addCommentData);
  });
});

// TESTING: deleteComments
describe('should delete a comment from an album', () => {
  test(`should delete a comment from an album with id 608f3c70197abc18509aec61`, async () => {
    const mReq = {
      params: {
        id: '608f3c70197abc18509aec61',
        commentid: '4990be955537ad1fb4458f13',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(albumTestData.deleteCommentData);
  });
});

// TESTING: createAlbum
describe('should Create an album', () => {
  test(`should Create an album with id 305f34a634413f11f020b130`, async () => {
    // delete any album with 305f34a634413f11f020b130
    await albumModel.findByIdAndDelete('305f34a634413f11f020b130');
    const mReq = {
      headers: { userid: '608d5450ec00005468607a11' },
      body: {
        _id: '305f34a634413f11f020b130',
        albumName: 'Egypt',
        primaryPhotoId: '608d5450ec00005468607a0f',
        photos: ['608d5450ec00005468617a0c', '608d5450ec00005468607a0f'],
        createdAt: '2021-05-03T00:07:30.005Z',
        updatedAt: '2021-05-03T00:07:30.005Z',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.createAlbum(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(albumTestData.createAlbumData);
  });
});

// TESTING: addPhoto
describe('should add Photo to an album', () => {
  test(`should should add Photo to an album id 608f3c70197abc18509aec5f`, async () => {
    const mReq = {
      params: { id: '608f3c70197abc18509aec5f' },
      body: {
        photoID: '608d5560ec00005468607a0e',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.addPhoto(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      data: 'ok',
    });
  });
});

// TESTING: removePhoto
describe('should delete a photo from an album', () => {
  test(`should delete a photo from an album with id 608f3c70197abc18509aec61`, async () => {
    const mReq = {
      params: {
        id: '608f3c70197abc18509aec61',
        photoid: '608d5450ec00005468607a0f',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.removePhoto(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      data: 'ok',
    });
  });
});

// TESTING: removePhotos
describe('should delete list of photos from an album', () => {
  test(`should delete a photo from an album with id 608f3c70197abc18509aec60`, async () => {
    const mReq = {
      params: {
        id: '608f3c70197abc18509aec60',
      },
      body: {
        photos: ['608d5450ec00005468617a0c', '608d5450ec00005468607a0f'],
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await albumController.removePhotos(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      data: 'ok',
    });
  });
});
