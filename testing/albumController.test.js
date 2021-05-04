// INCLUDE CONTROLLER TO TEST
const mongoose = require('mongoose');
const albumController = require('../controllers/albumController.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testcommons.js');

// TESTING: getInfo
describe("should retrieve Album's Info by id and send response correctly", () => {
  test(`should retrieve Album Info`, async () => {
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
            _id: new mongoose.Types.ObjectId('608d5450ec00005468607a0f'),
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
            _id: new mongoose.Types.ObjectId('608d5450ec00005468617a0c'),
          },
        ],
        comments: [],
        _id: new mongoose.Types.ObjectId('608f3c70197abc18509aec5e'),
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
          _id: new mongoose.Types.ObjectId('608d5450ec00005468617a0c'),
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
            _id: new mongoose.Types.ObjectId('608d5450ec00005468607a0f'),
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
            _id: new mongoose.Types.ObjectId('608d5450ec00005468617a0c'),
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
            _id: new mongoose.Types.ObjectId('6090c346c555f920e431f205'),
            userId: {
              _id: new mongoose.Types.ObjectId('608d55c7e512b74ee00791dd'),
              displayName: 'MariamKhashab',
            },
            body: ' Yummy !!',
            date: new Date('2021-05-04T03:45:10.686Z'),
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('6090c39bc555f920e431f206'),
            userId: {
              _id: new mongoose.Types.ObjectId('608d55c7e512b74ee00791db'),
              displayName: 'DanielEskandar',
            },
            body: 'delicious ',
            date: new Date('2021-05-04T03:46:35.121Z'),
            __v: 0,
          },
        ],
      },
    });
  });
});

// TESTING: editComments
describe('should edit a comment in an album', () => {
  test(`should edit a Comments with id 6090c79e4b51ed317019966b`, async () => {
    const mReq = {
      params: { id: '6090c79e4b51ed317019966b' },
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
        _id: new mongoose.Types.ObjectId('6090c79e4b51ed317019966b'),
        userId: new mongoose.Types.ObjectId('608d55c7e512b74ee00791db'),
        body: 'family is everything <3',
        date: new Date('2021-05-04T04:03:42.528Z'),
        __v: 0,
      },
    });
  });
});
