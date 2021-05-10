// INCLUDE CONTROLLER TO TEST
const mongoose = require('mongoose');
const albumController = require('../controllers/albumController.js');
const commentModel = require('../models/commentModel');
const albumModel = require('../models/albumModel');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// TESTING: getInfo
describe("should retrieve Album's Info by id and send response correctly", () => {
  test(`should retrieve Album Info`, async () => {
    jest.setTimeout(30000);
    const mReq = { params: { id: '608f3c70197abc18509aec5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await albumController.getInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        photos: [
          {
            sizes: {
              size: {
                original: {
                  height: 120,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                large: {
                  height: 190,
                  width: 20,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium800: {
                  height: 200,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium640: {
                  height: 1200,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium: {
                  height: 120,
                  width: 600,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                small320: {
                  height: 12,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                small: {
                  height: 1000,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                thumbnail: {
                  height: 50,
                  width: 50,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                largeSquare: {
                  height: 120,
                  width: 120,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                square: {
                  height: 60,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
              },
              canDownload: false,
            },
            _id: '608d5450ec00005468607a0f',
          },
          {
            sizes: {
              size: {
                original: {
                  height: 120,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                large: {
                  height: 190,
                  width: 20,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium800: {
                  height: 200,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium640: {
                  height: 1200,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium: {
                  height: 120,
                  width: 600,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                small320: {
                  height: 12,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                small: {
                  height: 1000,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                thumbnail: {
                  height: 50,
                  width: 50,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                largeSquare: {
                  height: 120,
                  width: 120,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                square: {
                  height: 60,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
              },
              canDownload: true,
            },
            _id: '608d5450ec00005468617a0c',
          },
        ],
        comments: [],
        _id: '608f3c70197abc18509aec5e',
        albumName: '2017 Spring Tokyo',
        primaryPhotoId: {
          sizes: {
            size: {
              original: {
                height: 120,
                width: 60,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              large: {
                height: 190,
                width: 20,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              medium800: {
                height: 200,
                width: 60,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              medium640: {
                height: 1200,
                width: 60,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              medium: {
                height: 120,
                width: 600,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              small320: {
                height: 12,
                width: 60,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              small: {
                height: 1000,
                width: 60,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              thumbnail: {
                height: 50,
                width: 50,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              largeSquare: {
                height: 120,
                width: 120,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              square: {
                height: 60,
                width: 60,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
            },
            canDownload: true,
          },
          _id: '608d5450ec00005468617a0c',
        },
        description: '',
        __v: 0,
        photocount: 2,
      },
    });
  });
});

// TESTING: getPhotos
describe("should retrieve Album's Photos", () => {
  test(`should retrieve Album's Photos with length 2`, async () => {
    const mReq = { params: { id: '608f3c70197abc18509aec5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await albumController.getPhotos(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        photos: [
          {
            sizes: {
              size: {
                original: {
                  height: 120,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                large: {
                  height: 190,
                  width: 20,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium800: {
                  height: 200,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium640: {
                  height: 1200,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium: {
                  height: 120,
                  width: 600,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                small320: {
                  height: 12,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                small: {
                  height: 1000,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                thumbnail: {
                  height: 50,
                  width: 50,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                largeSquare: {
                  height: 120,
                  width: 120,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                square: {
                  height: 60,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
              },
              canDownload: false,
            },
            _id: '608d5450ec00005468607a0f',
          },
          {
            sizes: {
              size: {
                original: {
                  height: 120,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                large: {
                  height: 190,
                  width: 20,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium800: {
                  height: 200,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium640: {
                  height: 1200,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                medium: {
                  height: 120,
                  width: 600,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                small320: {
                  height: 12,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                small: {
                  height: 1000,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                thumbnail: {
                  height: 50,
                  width: 50,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                largeSquare: {
                  height: 120,
                  width: 120,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
                square: {
                  height: 60,
                  width: 60,
                  source: 'https://www.google.com/',
                  url: 'https://www.google.com/',
                },
              },
              canDownload: true,
            },
            _id: '608d5450ec00005468617a0c',
          },
        ],
      },
    });
  });
});

// TESTING: getComments
describe('should get Comments in an album', () => {
  test(`should get Comments in an album with id 608f3c70197abc18509aec60`, async () => {
    const mReq = { params: { id: '608f3c70197abc18509aec60' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await albumController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        comments: [
          {
            _id: '6090c346c555f920e431f205',
            userId: {
              _id: '608d55c7e512b74ee00791dd',
              displayName: 'MariamKhashab',
            },
            body: ' Yummy !!',
            date: '2021-05-04T03:45:10.686Z',
            __v: 0,
          },
          {
            _id: '6090c39bc555f920e431f206',
            userId: {
              _id: '608d55c7e512b74ee00791db',
              displayName: 'DanielEskandar',
            },
            body: 'delicious',
            date: '2021-05-04T03:46:35.121Z',
            __v: 0,
          },
        ],
      },
    });
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
      send: jest.fn().mockReturnThis(),
    };
    await albumController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        _id: '6090ca99f002f5466cd8485b',
        userId: '608d55c7e512b74ee00791db',
        body: 'family is everything <3',
        date: '2021-05-04T04:03:42.528Z',
        __v: 0,
      },
    });
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
      send: jest.fn().mockReturnThis(),
    };
    await albumController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        _id: '1190beb07237ad1fb4458fae',
        userId: '608d5450ec00005468607a0c',
        body: 'GREAT SHOTS!',
        date: '2021-05-04T18:21:34.924Z',
        __v: 0,
      },
    });
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
      send: jest.fn().mockReturnThis(),
    };
    await albumController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: 'ok',
    });
  });
});

// TESTING: createAlbum
describe('should Create an album', () => {
  test(`should Create an album with id 305f34a634413f11f020b130`, async () => {
    // delete any album with 305f34a634413f11f020b130
    await albumModel.findByIdAndDelete('305f34a634413f11f020b130');
    const mReq = {
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
      send: jest.fn().mockReturnThis(),
    };
    await albumController.createAlbum(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        photos: ['608d5450ec00005468617a0c', '608d5450ec00005468607a0f'],
        comments: [],
        _id: '305f34a634413f11f020b130',
        albumName: 'Egypt',
        primaryPhotoId: '608d5450ec00005468607a0f',
        __v: 0,
      },
    });
  });
});
