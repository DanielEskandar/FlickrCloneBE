const userController = require('../controllers/userController.js');
const headers = require('./testcommons.js');

describe('should retrieve display name by id and send response correctly', () => {
  test('should retrieve display name DanielEskandar', async () => {
    const mReq = { headers: { userid: '608d55c7e512b74ee00791db' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getDispName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        displayName: 'DanielEskandar',
      },
    });
  });

  test('should retrieve display name AliaaKhalifa', async () => {
    const mReq = { headers: { userid: '608d55c7e512b74ee00791dc' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await userController.getDispName(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({
      status: 'success',
      data: {
        displayName: 'AliaaKhalifa',
      },
    });
  });
});
