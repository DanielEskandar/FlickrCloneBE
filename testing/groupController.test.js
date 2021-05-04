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

//TESTING GET PHOTO POOL
describe('should retrieve photos in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('should retrieve 1 photo ', async () => {
    const mReq = { params: { id: '608f3d0fb5ba8b4f34890a5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.GetPhotoPool(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        photos: ['608d5450ec00005468607a0f'],
      },
    });
  });
});

//TESTING GET ALL DISCUSSIONS
describe('should retrieve discussions in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('should retrieve 2 discussions ', async () => {
    const mReq = { params: { id: '608f3d0fb5ba8b4f34890a5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.GetAllDiscussions(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        discussionTopics: ['608f6e7519953b27004f6dab'],
      },
    });
  });
});

//TESTING GET DISCUSSION
describe('should retrieve discussion with ID 608f6e7519953b27004f6dac', () => {
  test(' ', async () => {
    const mReq = { params: { id: '608f6e7519953b27004f6dac' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.getDiscussion(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        replies: [],
        user: '608f3e678209d433946b946d',
        content: 'La casa de papel is overrated',
        date: '2021-01-01T00:00:00.000Z',
        __v: 0,
      },
    });
  });
});

//TESTING CREATE DISCUSSION
describe('should create new discussion with id 608f3d0fb5998b4f34890a5e in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('', async () => {
    const mReq = {
      params: { id: '608f3d0fb5ba8b4f34890a5e' },
      body: {
        _id: '608f3d0fb5998b4f34890a5e',
        content: 'i want fresh mango',
        date: '2020-02-02',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.createDiscussion(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        replies: [],
        _id: '608f3d0fb5998b4f34890a5e',
        content: 'i want fresh mango',
        date: '2020-02-02T00:00:00.000Z',
        __v: 0,
      },
    });
  });
});

//TESTING EDIT DISCUSSION
describe('should edit content field in discussion with id 608f6e7519953b27004f6dab in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('', async () => {
    const mReq = {
      params: { id: '608f6e7519953b27004f6dab' },
      body: {
        content: 'i want pasta',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.EditDiscussion(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        replies: [],
        _id: '608f6e7519953b27004f6dab',
        user: '608d5450ec00005468607a0c',
        content: 'i want pasta',
        date: '2021-01-01T00:00:00.000Z',
        __v: 0,
      },
    });
  });
});

//TESTING DELETE DICSUSSION
describe('should delete discussion with id 608f6e7519953b27004f6dab ', () => {
  test('returns null data', async () => {
    const mReq = {
      params: { id: '608f6e7519953b27004f6dab' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.DeleteDiscussion(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: null,
    });
  });
});

//TESTING CREATE GROUP
describe('userid in headers should create new group with content in body, add userid as member and set as admin', () => {
  test('', async () => {
    const mReq = {
      params: {},
      body: {
        _id: '608f3d0fb5b8884f34890a5e',
        public: true,
        name: 'Backend Test Group',
        invitation: true,
        description: 'this is create group api test.',
        startDate: '2021-01-01',
      },
      headers: { userid: '608d5450ec00005468607a0c' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await groupController.CreateGroup(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        startDate: '2021-01-01T00:00:00.000Z',
        photos: [],
        discussionTopics: [],
        _id: '608f3d0fb5b8884f34890a5e',
        public: true,
        name: 'Backend Test Group',
        invitation: true,
        description: 'this is create group api test.',
        users: [],
        __v: 0,
      },
    });
  });
});
