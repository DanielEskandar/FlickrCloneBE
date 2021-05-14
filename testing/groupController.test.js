// INCLUDE CONTROLLER TO TEST
const groupController = require('../controllers/groupController.js');

// INCLUDE TEST DATA
const groupTestData = require('./test_data/groupTestData.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// INIT TEST COMMONS
headers.initTesting();

// TESTING: getInfo
describe('should retrieve all groups info', () => {
  test('should retrieve info about 3 groups', async () => {
    const mReq = {};
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.getInfo(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.getInfoData);
  });
});

//TESTING: GetMembers

describe('should retrieve members in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('should retrieve 2 users', async () => {
    const mReq = { params: { id: '608f3d0fb5ba8b4f34890a5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.getMembers(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.getMembersData);
  });
});

//TESTING GET PHOTO POOL
describe('should retrieve photos in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('should retrieve 1 photo ', async () => {
    const mReq = { params: { id: '608f3d0fb5ba8b4f34890a5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.getPhotoPool(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.getPhotoPoolData);
  });
});

//TESTING GET ALL DISCUSSIONS
describe('should retrieve discussions in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('should retrieve 2 discussions ', async () => {
    const mReq = { params: { id: '608f3d0fb5ba8b4f34890a5e' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.getAllDiscussions(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.getAllDiscussionsData);
  });
});

//TESTING GET DISCUSSION
describe('should retrieve discussion with ID 608f6e7519953b27004f6dac', () => {
  test(' ', async () => {
    const mReq = { params: { id: '608f6e7519953b27004f6dac' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.getDiscussion(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.getDiscussionData);
  });
});

//TESTING CREATE DISCUSSION
/*describe('should create new discussion with id 608f3d0fb5998b4f34890a5e in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('', async () => {
    const mReq = {
      params: { id: '608f3d0fb5ba8b4f34890a5e' },
      body: {
        _id: '608f3d0fb5998b4f34890a5e',
        content: 'i want fresh mango',
        date: '2020-02-02',
      },
      headers: { id: '608d5450ec00005468607a0c' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.createDiscussion(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.createDiscussionData);
  });
});
*/
//TESTING EDIT DISCUSSION
describe('should edit content field in discussion with id 608f6e7519953b27004f6dab in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('', async () => {
    const mReq = {
      params: { id: '608f6e7519953b27004f6dab' },
      body: {
        content: 'edit 1',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.editDiscussion(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.editDiscussionData);
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
      json: jest.fn().mockReturnThis(),
    };
    await groupController.deleteDiscussion(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.deleteDiscussionData);
  });
});

//TESTING CREATE GROUP
/*describe('userid in headers should create new group with content in body, add userid as member and set as admin', () => {
  test('', async () => {
    const mReq = {
      params: {},
      body: {
        _id: '608f3d0fb5b8184f34890a50',
        public: true,
        name: 'Backend Test1',
        invitation: true,
        description: 'this is create group api test.',
        startDate: '2021-01-01',
      },
      headers: { userid: '608d5450ec00005468607a0c' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.createGroup(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.createGroupData);
  });
});
*/
