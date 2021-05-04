// INCLUDE CONTROLLER TO TEST
const mongoose = require('mongoose');
const photoController = require('../controllers/photoController.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testcommons.js');

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
        comments: ['608d5450ec16665468617a0c'],
        favourites: 119,
        views: 541,
        tags: ['#Amesterdam', '#Colorful', '#SunnyDay'],
        dateUploaded: '2018-12-23T18:29:43.511Z',
        dateTaken: '2017-07-12T18:25:47.511Z',
        location: '608d5450ec00005468604a1c',
        title: 'Wijdesteeg in Amsterdam',
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
        comments: ['608d5450ec10005468617a0c'],
        favourites: 51,
        views: 337,
        tags: ['#Sakure', '#Flowers', '#Nihon'],
        dateUploaded: '2021-12-23T18:25:43.511Z',
        dateTaken: '2013-07-23T18:25:43.511Z',
        location: '608d5450ec00005468604a0c',
        title: 'Sakura Season in Nihon',
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