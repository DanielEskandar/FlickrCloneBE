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
