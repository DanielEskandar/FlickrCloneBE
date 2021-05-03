// INCLUDE CONTROLLER TO TEST
const mongoose = require('mongoose');
const galleryController = require('../controllers/galleryController.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testcommons.js');

// TESTING: getInfo
describe("should retrieve Gallery's Info by id and send response correctly", () => {
  test(`should retrieve Gallery Info`, async () => {
    const mReq = { params: { id: '608f34a634413f11f020b127' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await galleryController.getInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        viewCount: 0,
        comments: [],
        _id: new mongoose.Types.ObjectId('608f34a634413f11f020b127'),
        galleryName: 'Movement',
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
            canDownload: false,
          },
          _id: new mongoose.Types.ObjectId('604d5450ec00005468617a0c'),
        },
        photos: [
          {
            _id: new mongoose.Types.ObjectId('608f34a634413f11f020b128'),
            photoId: {
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
              _id: new mongoose.Types.ObjectId('604d5450ec00005468617a0c'),
            },
            remark: '',
          },
          {
            _id: new mongoose.Types.ObjectId('608f34a634413f11f020b129'),
            photoId: {
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
            remark: '',
          },
        ],
        createdAt: new Date('2021-05-03T00:07:30.005Z'),
        updatedAt: new Date('2021-05-03T00:07:30.005Z'),
        description: 'Photos that capture the world in motion.',
        __v: 0,
        photocount: 2,
      },
    });
  });
});

// TESTING: getPhotos
describe("should retrieve Gallery's Photos", () => {
  test(`should retrieve Gallery's Photos with length 2`, async () => {
    const mReq = { params: { id: '608f34a634413f11f020b127' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await galleryController.getPhotos(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        photos: [
          {
            _id: new mongoose.Types.ObjectId('608f34a634413f11f020b128'),
            photoId: {
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
              _id: new mongoose.Types.ObjectId('604d5450ec00005468617a0c'),
            },
            remark: '',
          },
          {
            _id: new mongoose.Types.ObjectId('608f34a634413f11f020b129'),
            photoId: {
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
            remark: '',
          },
        ],
      },
    });
  });
});
