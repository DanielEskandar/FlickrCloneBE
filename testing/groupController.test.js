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

// TESTING: GetMembers
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

// TESTING GET PHOTO POOL
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

// TESTING GET ALL DISCUSSIONS
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

// TESTING GET DISCUSSION
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

// TESTING GET REPLY
describe('should retrieve reply with ID 609fe93c38075024f8d3e6f5', () => {
  test(' ', async () => {
    const mReq = { params: { id: '609fe93c38075024f8d3e6f5' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.getReply(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.getReplyData);
  });
});

// TEST GET ALL REPLIES
describe('should retrieve replies on discussion id 608f6e7519953b27004f6dac', () => {
  test('should retrieve 1 reply ', async () => {
    const mReq = { params: { id: '608f6e7519953b27004f6dac' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.getAllReplies(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.getAllRepliesData);
  });
});

// TESTING CREATE DISCUSSION
describe('should create new discussion with id 608d33c7e512b74ee00791df in group with id 608f3d0fb5ba8b4f34890a5e', () => {
  test('', async () => {
    const mReq = {
      params: { id: '608f3d0fb5ba8b4f34890a5e' },
      body: {
        _id: '608d33c7e512b74ee00791df',
        content: 'best pastaaa ever',
        date: '2021-01-01',
      },
      headers: { userid: '608d55c7e512b74ee00791de' },
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

// TESTING ADD REPLY
describe('should create new reply with id 610fe93c38075024f8d3e6f3 on discussion with id 608d55c7e512b74ee00791dd', () => {
  test('', async () => {
    const mReq = {
      params: { id: '608d55c7e512b74ee00791dd' },
      body: {
        _id: '610fe93c38075024f8d3e6f3',
        content: 'mori sushi is the best',
        date: '2021-01-01',
      },
      headers: { userid: '608d55c7e512b74ee00791de' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.addReply(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.addReplyData);
  });
});
//TESTING ADD TO PHOTO POOL
describe('should add photo with id 604d5450ec00005468617a0c to groups photopool with group id 608f3d0fb5ba8b4f34890a5e', () => {
  test('', async () => {
    const mReq = {
      params: {
        id: '608f3d0fb5ba8b4f34890a5e',
        photoid: '604d5450ec00005468617a0c',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.addToPhotoPool(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.addToPhotoPoolData);
  });
});

// TESTING EDIT DISCUSSION
describe('should edit content field in discussion with id 608f6e7519953b27004f6dac', () => {
  test('', async () => {
    const mReq = {
      params: { id: '608f6e7519953b27004f6dac' },
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

// TESTING EDIT REPLY
describe('should edit content field in reply with id 609fe93c38075024f8d3e6f5', () => {
  test('', async () => {
    const mReq = {
      params: { id: '609fe93c38075024f8d3e6f5' },
      body: {
        content: 'try seoudi',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.editReply(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.editReplyData);
  });
});

// TESTING DELETE DICSUSSION
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

//TESTING REMOVE PHOTO FROM PHOTO POOL
describe('should remove photo with id 604d5450ec00005468617a0c from group pool with id 608f3d0fb5ba8b4f34890a5e ', () => {
  test('returns 1 photo only', async () => {
    const mReq = {
      params: {
        id: '608f3d0fb5ba8b4f34890a5e',
        photoid: '604d5450ec00005468617a0c',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.removePhotofromPool(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.removePhotofromPoolData);
  });
});

// TESTING DELETE REPLY
describe('should delete reply with id 609fe93c38075024f8d3e6f5 ', () => {
  test('returns null data', async () => {
    const mReq = {
      params: { id: '609fe93c38075024f8d3e6f5' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await groupController.deleteReply(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(groupTestData.deleteReplyData);
  });
});

// TESTING CREATE GROUP
describe('userid in headers should create new group with content in body, add userid as member and set as admin', () => {
  test('', async () => {
    const mReq = {
      params: {},
      body: {
        _id: '609eed338a55978b34e2f061',
        name: 'backend unit test',
        startDate: '2021-01-02',
      },
      headers: { userid: '608d55c7e512b74ee00791de' },
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
