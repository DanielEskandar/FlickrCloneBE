// INCLUDE CONTROLLER TO TEST
const photoController = require('../controllers/photoController.js');

// INCLUDE TEST DATA
const photoTestData = require('./test_data/photoTestData.js');

// INCLUDE COMMON TEST HEADERS
const headers = require('./testCommon.js');

// INIT TEST COMMONS
headers.initTesting();

// TESTING: getFavourites
describe('should retrieve number of times photo was favourited', () => {
  test('should retrieve favourites = 7', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getFavourites(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getFavouritesData1);
  });

  test('should retrieve favourites = 51', async () => {
    const mReq = { params: { id: '608d5450ec00005468617a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getFavourites(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getFavouritesData2);
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
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getInformation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getInformationData1);
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
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getInformation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getInformationData2);
  });
});

// TESTING: getComments
describe('should retrieve the comments on a photo (their IDs)', () => {
  test('should retrieve IDs 604d5450ec00005468617a0c', async () => {
    const mReq = { params: { id: '604d5450ec00005468617a0c' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getCommentsData1);
  });
});

describe('should retrieve the comments on a photo (their IDs)', () => {
  test('should retrieve IDs 608d5450ec00005468607a0f', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468607a0f' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getComments(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getCommentsData2);
  });
});

// TESTING ADD COMMENT
describe('should add comments on a photo', () => {
  test('should retrieve information about new comment', async () => {
    const mReq = {
      params: { id: '604d5450ec00005468617a0c' },
      user: { id: '608d55c7e512b74ee00791db' },
      body: {
        body: 'Unit testing comment',
        date: '2021-05-04T14:07:48.071Z',
        _id: '508d55c7e512b74ee00791db',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addCommentData1);
  });
});

describe('should add comments on a photo', () => {
  test('should retrieve information about new comment', async () => {
    const mReq = {
      params: { id: '604d5450ec00005468617a0c' },
      user: { id: '608d55c7e512b74ee00791db' },
      body: {
        body: 'Comment to add by photo testing',
        date: '2021-05-04T14:07:48.071Z',
        _id: '508d55c7e512b74ee00891db',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.addComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addCommentData2);
  });
});

// EDIT COMMENT
describe('should edit comments on a photo', () => {
  test('should edit comment 6090c346c555f920e121f205', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791db' },
      params: { id: '6090c346c555f920e121f205' },
      body: {
        body: 'Nice angle, edit comment test',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.editCommentData1);
  });
});

describe('should edit comments on a photo', () => {
  test('should edit comment 6001c346c555f920e111f205', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791db' },
      params: { id: '6001c346c555f920e111f205' },
      body: {
        body: 'Edited successfully',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.editComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.editCommentData2);
  });
});

//TESTING GET SIZES
describe('should retrieve all sizes of a photo', () => {
  test('should retrieve sizes of photo 608d5450ec00005468607a0f', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getSizes(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getSizesData1);
  });
});

describe('should retrieve all sizes of a photo', () => {
  test('should retrieve sizes of photo 608d5450ec00005468607a0f', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getSizes(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getSizesData1);
  });
});

// TESTING SET TAGS
describe('should set a tag on a photo', () => {
  test('should set tag Unittesttag1', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b5d' },
      body: {
        tags: ['Unittesttag1', 'Unit', 'Test', 'Tag'],
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.setTags(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.setTagData1);
  });
});

describe('should set a tag on a photo', () => {
  test('should set tag MirrorlessCamera', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b4d' },
      body: {
        tags: ['MirrorlessCamera', 'LowExposure'],
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.setTags(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.setTagData2);
  });
});

// TESTING DELETE TAG
describe('should delete a tag', () => {
  test('should delete tags beauty', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791dc' },
      params: {
        id: '608d5450ec00005468628b2d',
      },
      body: {
        tags: 'beauty',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.removeTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.removeTag1);
  });
});

describe('should delete a tag on a photo', () => {
  test('should delete tag light', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791dc' },
      params: {
        id: '608d5450ec00005468628b2d',
      },
      body: {
        tags: 'light',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.removeTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.removeTag2);
  });
});

// TESTING ADD TAG
describe('should add a tag on a photo', () => {
  test('should add tag AddingTag', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b6d' },
      body: {
        tags: 'AddingTag',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.addTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addTagData1);
  });
});

describe('should add a tag on a photo', () => {
  test('should add tag Skyline', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628b6d' },
      body: {
        tags: 'Skyline',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.addTag(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.addTagData2);
  });
});

// EDIT PHOTO INFO
describe('should edit photo info', () => {
  test('should edit photo info with id 608d5450ec00005468628a0d', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      user: { id: '608d55c7e512b74ee00791dc' },
      body: {
        title: 'Test Edit Info',
        description: 'New description for testing',
        tags: ['#Test', '#FlickrClonoe'],
        dateUploaded: '2020-11-03T06:10:45+00:00',
        dateTaken: '2019-11-03T06:10:45+00:00',
        permissions: {
          public: 0,
          friend: 1,
          family: 1,
          comment: 2,
          addMeta: 2,
        },
        license: 2,
        safetyLevel: 1,
        contentType: 'Photo',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.editPhotoInformation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.editPhotoInfo);
  });
});

// get GalleriesforPhoto
describe('should  get Galleries for Photo', () => {
  test('should get Galleries for Photo with id 608d5450ec00005468628a0d', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468628a0d' },
      body: {
        per_page: 3,
        page: 1,
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getGalleriesforPhoto(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getGalleriesforPhoto);
  });
});

// TESTING DELETE COMMENT
describe('should delete a comment', () => {
  test('should delete comment with ID 608d5450ec00005468629b3d', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791dc' },
      params: {
        id: '608d5450ec00005468628b2d',
        commentid: '608d5450ec00005468629b3d',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(photoTestData.deleteCommentData);
  });
});

describe('should delete a comment', () => {
  test('should delete comment with ID 608d5450ec00005468629b3d', async () => {
    const mReq = {
      user: { id: '608d55c7e512b74ee00791dc' },
      params: {
        id: '608d5450ec00005468628b2d',
        commentid: '608d5450ec00005468629b4d',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.deleteComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(204);
    expect(mRes.json).toBeCalledWith(photoTestData.deleteCommentData);
  });
});

// TESTING: getTagged
describe('should retrieve tagged people in a photo', () => {
  test('should retrieve 1 tagged user', async () => {
    const mReq = { params: { id: '608d5450ec00005468607a0f' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getTagged(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getTaggedData);
  });
});

//TESTING TAG USER
describe('should tag a user to the photo ', () => {
  test('should retrieve 2 tagged users', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468607a0f',
        userid: '608d55c7e512b74ee00791dc',
      },
      user: { id: '608d55c7e512b74ee00791de' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.tagUser(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.tagUserData);
  });
});

//TESTING REMOVE TAGGED USER
describe('should remove a tagged user from the photo ', () => {
  test('should retrieve 1 tagged users', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468607a0f',
        userid: '608d55c7e512b74ee00791dc',
      },
      user: { id: '608d55c7e512b74ee00791de' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.removePerson(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.removePersonData);
  });
});

// upload Photo
describe('Should record the data of an uploaded photo', () => {
  test('should add info about a new photo by user 60b3d74a79a1820bd89091c4', async () => {
    const mReq = {
      user: { id: '608d5450ec00005468607a0c' },
      body: photoTestData.uploadReqData.body,
      file: photoTestData.uploadReqData.file,
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.uploadPhoto(mReq, mRes);
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.json).toBeCalledWith(photoTestData.uploadResData);
  });
});

// TESTING: search
describe('should search photos and send response correctly', () => {
  test('should search all photos whose title, description or tags is photo1', async () => {
    const mReq = { query: { searchText: 'photo1' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.search(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.searchData1);
  });

  test('should send page 2 of size 1 of all photos whose title, description or tags is photo1', async () => {
    const mReq = { query: { searchText: 'photo1', page: 2, limit: 1 } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.search(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.searchData2);
  });

  test('should search all photos whose title, description or tags is photo2', async () => {
    const mReq = { query: { searchText: 'photo2' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.search(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.searchData3);
  });

  test('should search all photos whose title, description or tags is photo1 photo2', async () => {
    const mReq = { query: { searchText: 'photo1 photo2' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.search(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.searchData4);
  });

  test('should search all photos whose title, description or tags is photo1 photo2 with sorting on dateTaken', async () => {
    const mReq = { query: { searchText: 'photo1 photo2', sort: 'dateTaken' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.search(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.searchData5);
  });

  test('should search all photos whose title, description or tags is photo3 photo4', async () => {
    const mReq = { query: { searchText: 'photo3 photo4' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.search(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.searchData6);
  });

  test('should search all photos whose title, description or tags is photo4', async () => {
    const mReq = { query: { searchText: 'photo4' } };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.search(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.searchData7);
  });
});

// get photo location
describe('should  get location details of a photo', () => {
  test('should return coordinates of  Photo with id 608d5450ec00005468607a0f', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468607a0f' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getLocation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getLocationData);
  });
});

// set photo location
describe('should  set a new location to the photo', () => {
  test('', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468607a0f' },
      body: {
        name: 'location 1',
        coordinates: { latitude: 50, longitude: 70 },
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.setLocation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.setLocationData);
  });
});

// delete photo location
describe('should remove the photo from tagged location', () => {
  test('returns photo details with location set to null', async () => {
    const mReq = {
      params: { id: '608d5450ec00005468607a0f' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.deleteLocation(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.deleteLocationData);
  });
});

//TESTING GET PERM
describe('should get photo permissions with id 608d5450ec00005468607a0f ', () => {
  test('should retrieve 2 tagged users', async () => {
    const mReq = {
      params: {
        id: '608d5450ec00005468607a0f',
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.getPerms(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.getPermData);
  });
});

//TESTING SET PERM
describe('should set photo permissions with id 608d5450ec00005468628a0d ', () => {
  test('should return updated permissions', async () => {
    const mReq = {
      params: {
        id: '604d5450ec00005468617a0c',
      },
      body: {
        public: false,
        friend: false,
        family: true,
        comment: 2,
        addMeta: 1,
      },
      user: { id: '608d55c7e512b74ee00791dd' },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.setPerms(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.setPermData);
  });
});

//TESTING EXPOLRE
describe('should return trending photos on the explore page ', () => {
  test('should return trending photos on the explore page', async () => {
    const mReq = {
      body: {
        per_page: 100,
        page: 1,
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await photoController.explore(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith(photoTestData.explore);
  });
});
