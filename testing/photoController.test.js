// INCLUDE CONTROLLER TO TEST
const mongoose = require('mongoose');
const photoController = require('../controllers/photoController.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// TESTING: getFavourites
describe('should retrieve number of times photo was favourited', () => {
  test('should retrieve favourites = 7', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await photoController.getFavourites(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        favourites: 7,
      },
    });
  });

  test('should retrieve favourites = 51', async () => {
    const mReq = { params: { id: '608d5450ec00005468617a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await photoController.getFavourites(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        favourites: 51,
      },
    });
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
      send: jest.fn().mockReturnThis(),
    };
    await photoController.getInformation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
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
        comments: ['6001c346c555f920e111f205', '6090c346c555f920e121f205'],
        favourites: 119,
        views: 541,
        tags: ['#Amesterdam', '#Colorful', '#SunnyDay'],
        dateUploaded: '2018-12-23T18:29:43.511Z',
        dateTaken: '2017-07-12T18:25:47.511Z',
        location: '608d5450ec00005468604a1c',
        title: 'Wijdesteeg in Amsterdam',
        userId: '608d55c7e512b74ee00791dd',
        description: 'So vibrant!',
        EXIF: '12222f',
        contentType: 'Photo',
        peopleTagged: [
          {
            _id: '60907e13495ac0316c2b19cb',
            userId: '608d55c7e512b74ee00791de',
            tagDate: '2021-01-13T18:25:43.511Z',
          },
        ],
        __v: 0,
      },
    });
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
      send: jest.fn().mockReturnThis(),
    };
    await photoController.getInformation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
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
        comments: ['6090acefc4cc491a7cf8b47c', '6090beb07237ad1fb4458fae'],
        favourites: 51,
        views: 337,
        tags: ['#Sakure', '#Flowers', '#Nihon'],
        dateUploaded: '2021-12-23T18:25:43.511Z',
        dateTaken: '2013-07-23T18:25:43.511Z',
        location: '608d5450ec00005468604a0c',
        title: 'Sakura Season in Nihon',
        userId: '608d55c7e512b74ee00791dc',
        description: 'Kawaii',
        EXIF: '12trewf',
        contentType: 'Other',
        peopleTagged: [
          {
            _id: '609083a8a127743ad03ff9ec',
            userId: '608d55c7e512b74ee00791de',
            tagDate: '2021-12-13T18:25:43.511Z',
          },
        ],
        __v: 0,
      },
    });
  });
});

// TESTING: getComments
describe('should retrieve the comments on a photo (their IDs)', () => {
  test('should retrieve IDs 604d5450ec00005468617a0c', async () => {
    const mReq = { params: { id: '604d5450ec00005468617a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await photoController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        comments: ['6001c346c555f920e111f205', '6090c346c555f920e121f205'],
      },
    });
  });
});

describe('should retrieve the comments on a photo (their IDs)', () => {
  test('should retrieve IDs 608d5450ec00005468607a0f', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468607a0f' },
      body: {
        body: 'Using this as my new wallpaper!',
        userId: '608d55c7e512b74ee00791db',
        date: '2021-05-04T14:07:48.071Z',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await photoController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        comments: [],
      },
    });
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
        commentid: '508d55c7e512b74ee00791db',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await photoController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        _id: '508d55c7e512b74ee00791db',
        body: 'Unit testing comment',
        userId: '608d55c7e512b74ee00791db',
        date: '2021-05-04T14:07:48.071Z',
        __v: 0,
      },
    });
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
        commentid: '508d55c7e512b74ee00791db',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await photoController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        _id: '508d55c7e512b74ee00791db',
        body: 'Comment to add by photo testing',
        userId: '608d55c7e512b74ee00791db',
        date: '2021-05-04T14:07:48.071Z',
        __v: 0,
      },
    });
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
      send: jest.fn().mockReturnThis(),
    };
    await photoController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        _id: '6090c346c555f920e121f205',
        body: 'Nice angle, edit comment test',
        date: '2021-12-04T14:07:48.071Z',
        userId: '608d55c7e512b74ee00791db',
        __v: 0,
      },
    });
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
      send: jest.fn().mockReturnThis(),
    };
    await photoController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        _id: '6001c346c555f920e111f205',
        body: 'Edited successfully',
        userId: '608d55c7e512b74ee00791db',
        date: '2021-05-04T14:07:48.071Z',
        __v: 0,
      },
    });
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
      send: jest.fn().mockReturnThis(),
    };
    await photoController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: 'deleted',
    });
  });
});

//TESTING GET SIZES
describe('should retrieve all sizes of a photo', () => {
  test('should retrieve sizes of photo 608d5450ec00005468607a0f', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await photoController.getSizes(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
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
      },
    });
  });
});

describe('should retrieve all sizes of a photo', () => {
  test('should retrieve sizes of photo 608d5450ec00005468607a0f', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await photoController.getSizes(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
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
      },
    });
  });
});
