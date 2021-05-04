// INCLUDE CONTROLLER TO TEST
const groupController = require('../controllers/groupController.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testcommons.js');
const mongoose = require('mongoose');

// TESTING: getInfo
describe('should retrieve all groups info', () => {
  test('should retrieve info about 3 groups', async () => {
    const mReq = {};
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.GetInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        groups: [
          {
            startDate: '2021-01-01T00:00:00.000Z',
            photos: ['608d5450ec00005468607a0f'],
            discussionTopics: ['608f6e7519953b27004f6dab'],
            _id: '608f3d0fb5ba8b4f34890a5e',
            public: true,
            name: 'What to eat?',
            invitation: true,
            description:
              'This is a platform to share food recommendations, along with restaurants rating too.',
            users: [
              {
                joinDate: '2021-01-01T00:00:00.000Z',
                _id: '608d5450ec00005468607a0c',
                admin: true,
              },
              {
                joinDate: '2021-01-01T00:00:00.000Z',
                _id: '608d55c7e512b74ee00791dd',
                admin: false,
              },
            ],
            pinnedThread: null,
            ageRestriction: false,
            __v: 0,
          },
          {
            startDate: '2021-01-01T00:00:00.000Z',
            photos: ['608d5450ec00005468607a0f'],
            discussionTopics: ['608f6e7519953b27004f6dab'],
            _id: '608f3e678209d433946b946d',
            public: false,
            name: 'Dogs Day Out',
            invitation: true,
            description:
              'Welcome to Dogs Day Out, a place to share our love for our 4 legged friends!',
            users: [
              {
                joinDate: '2021-01-01T00:00:00.000Z',
                _id: '608d55c7e512b74ee00791dd',
                admin: true,
              },
              {
                joinDate: '2021-01-01T00:00:00.000Z',
                _id: '608d55c7e512b74ee00791db',
                admin: false,
              },
              {
                joinDate: '2021-01-01T00:00:00.000Z',
                _id: '608d55c7e512b74ee00791dc',
                admin: false,
              },
            ],
            pinnedThread: null,
            ageRestriction: false,
            __v: 0,
          },
        ],
      },
    });
  });
});

//TESTING: GetMembers

describe('should retrieve members in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('should retrieve 2 users', async () => {
    const mReq = { params: { id: '608f3d0fb5ba8b4f34890a5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.GetMembers(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        users: [
          {
            joinDate: '2021-01-01T00:00:00.000Z',
            _id: '608d5450ec00005468607a0c',
            admin: true,
          },
          {
            joinDate: '2021-01-01T00:00:00.000Z',
            _id: '608d55c7e512b74ee00791dd',
            admin: false,
          },
        ],
      },
    });
  });
});

//PHOTO POOL TESTER
