// INCLUDE CONTROLLER TO TEST
const mongoose = require('mongoose');
const galleryController = require('../controllers/galleryController.js');
const commentModel = require('../models/commentModel');
const galleryModel = require('../models/galleryModel');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// TESTING: getInfo
describe("should retrieve Gallery's Info by id and send response correctly", () => {
  test(`should retrieve Gallery Info`, async () => {
    jest.setTimeout(30000);
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
        _id: '608f34a634413f11f020b127',
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
          _id: '604d5450ec00005468617a0c',
        },
        photos: [
          {
            _id: '608f34a634413f11f020b128',
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
              _id: '604d5450ec00005468617a0c',
            },
            remark: '',
          },
          {
            _id: '608f34a634413f11f020b129',
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
              _id: '608d5450ec00005468607a0f',
            },
            remark: '',
          },
        ],
        createdAt: '2021-05-03T00:07:30.005Z',
        updatedAt: '2021-05-03T00:07:30.005Z',
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
            _id: '608f34a634413f11f020b128',
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
              _id: '604d5450ec00005468617a0c',
            },
            remark: '',
          },
          {
            _id: '608f34a634413f11f020b129',
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
              _id: '608d5450ec00005468607a0f',
            },
            remark: '',
          },
        ],
      },
    });
  });
});

// TESTING: getComments
describe('should get Comments in a gallery', () => {
  test(`should get Comments in a gallery with id 608f34a634413f11f020b124`, async () => {
    const mReq = { params: { id: '608f34a634413f11f020b124' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await galleryController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        comments: [
          {
            _id: '6090acefc4cc491a7cf8b47c',
            userId: {
              _id: '608d55c7e512b74ee00791dc',
              displayName: 'AliaaKhalifa',
            },
            body: 'Love it!',
            date: '2021-05-04T02:09:51.993Z',
            __v: 0,
          },
          {
            _id: '6090b5e00c36663c94566fbe',
            userId: {
              _id: '608d5450ec00005468607a0c',
              displayName: 'AhmedAbdulkader99',
            },
            body: 'Wow',
            date: '2021-05-04T02:48:00.264Z',
            __v: 0,
          },
        ],
      },
    });
  });
});

// TESTING: editComments
describe('should edit a comment in a gallery', () => {
  test(`should edit a Comments with id 6090beb07237ad1fb4458fae`, async () => {
    const mReq = {
      params: { id: '6090beb07237ad1fb4458fae' },
      body: { body: 'I like it' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await galleryController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        _id: '6090beb07237ad1fb4458fae',
        userId: '608d5450ec00005468607a0c',
        body: 'I like it',
        date: '2021-05-04T03:25:36.334Z',
        __v: 0,
      },
    });
  });
});

// TESTING: addComments
describe('should Add a comment to a gallery', () => {
  test(`should Add a comment to a gallery with id 608f34a634413f11f020b121`, async () => {
    // delete any comment with 5590beb07237ad1fb4458fae
    await commentModel.findByIdAndDelete('5590beb07237ad1fb4458fae');
    const mReq = {
      params: { id: '608f34a634413f11f020b121' },
      body: {
        _id: '5590beb07237ad1fb4458fae',
        userId: '608d5450ec00005468607a0c',
        date: '2021-05-04T18:21:34.924Z',
        body: 'good one',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await galleryController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        _id: '5590beb07237ad1fb4458fae',
        userId: '608d5450ec00005468607a0c',
        body: 'good one',
        date: '2021-05-04T18:21:34.924Z',
        __v: 0,
      },
    });
  });
});

// TESTING: deleteComments
describe('should delete a comment from a gallery', () => {
  test(`should delete a comment from a gallery with id 608f34a634413f11f020b121`, async () => {
    const mReq = {
      params: {
        id: '608f34a634413f11f020b121',
        commentid: '4590be955537ad1fb4458f11',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await galleryController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: 'ok',
    });
  });
});

// TESTING: createGallery
describe('should Create a gallery', () => {
  test(`should Create a gallery with id 708f34a634413f11f020b139`, async () => {
    // delete any gallery with 708f34a634413f11f020b139
    await galleryModel.findByIdAndDelete('708f34a634413f11f020b139');
    const mReq = {
      body: {
        _id: '708f34a634413f11f020b139',
        galleryName: 'Egypt',
        createdAt: '2021-05-03T00:07:30.005Z',
        updatedAt: '2021-05-03T00:07:30.005Z',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await galleryController.createGallery(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        viewCount: 0,
        comments: [],
        _id: '708f34a634413f11f020b139',
        galleryName: 'Egypt',
        createdAt: '2021-05-03T00:07:30.005Z',
        updatedAt: '2021-05-03T00:07:30.005Z',
        photos: [],
        __v: 0,
      },
    });
  });
});
