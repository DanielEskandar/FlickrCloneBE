module.exports.userNotFound = {
  status: 'error',
  message: 'No user is found by that ID',
};

module.exports.getDispNameData1 = {
  status: 'success',
  data: {
    displayName: 'DanielEskandar',
  },
};

module.exports.getDispNameData2 = {
  status: 'success',
  data: {
    displayName: 'AliaaKhalifa',
  },
};

module.exports.getRealNameData1 = {
  status: 'success',
  data: {
    firstName: 'Ahmed',
    lastName: 'Abdulkader',
  },
};

module.exports.getRealNameData2 = {
  status: 'success',
  data: {
    firstName: 'Mariam',
    lastName: 'Khashab',
  },
};

module.exports.getUserInfoData1 = {
  status: 'success',
  data: {
    email: 'ahmedkader99@mailserver.com',
    occupation: 'Photographer',
    hometown: 'Beverly Hills',
    currentCity: 'California',
    country: 'United States',
    joinDate: '2015-10-07T06:09:54.000Z',
  },
};

module.exports.getUserInfoData2 = {
  status: 'success',
  data: {
    email: 'daniel_eskandar99@mailserver.com',
    occupation: 'Artist',
    hometown: 'Ile de France',
    currentCity: 'Paris',
    country: 'France',
    joinDate: '2020-11-03T06:10:45.000Z',
  },
};

module.exports.getLimitsData1 = {
  status: 'success',
  data: {
    limits: {
      photos: {
        maxdisplaypx: 1024,
        maxupload: 15728640,
      },
      videos: {
        maxduration: 90,
        maxupload: 15728640,
      },
    },
  },
};

module.exports.getLimitsData2 = {
  status: 'success',
  data: {
    limits: {
      photos: {
        maxdisplaypx: 1024,
        maxupload: 15728640,
      },
      videos: {
        maxduration: 90,
        maxupload: 15728640,
      },
    },
  },
};

module.exports.getFollowingData1 = {
  status: 'success',
  count: 4,
  data: {
    _id: '608d55c7e512b74ee00791de',
    following: [
      {
        _id: '60914e1ba87d736f3c382ed6',
        user: {
          _id: '608d55c7e512b74ee00791db',
          displayName: 'DanielEskandar',
          firstName: 'Daniel',
          lastName: 'Eskandar',
        },
        relation: 'undetermined',
        followDate: '2021-05-04T12:16:24.255Z',
      },
      {
        _id: '60914e1ba87d736f3c382ed7',
        user: {
          _id: '608d5450ec00005468607a0c',
          displayName: 'AhmedAbdulkader99',
          firstName: 'Ahmed',
          lastName: 'Abdulkader',
        },
        relation: 'undetermined',
        followDate: '2021-05-04T12:17:24.255Z',
      },
      {
        _id: '60914e1ba87d736f3c382ed8',
        user: {
          _id: '608d55c7e512b74ee00791dc',
          displayName: 'AliaaKhalifa',
          firstName: 'Aliaa',
          lastName: 'Khalifa',
        },
        relation: 'undetermined',
        followDate: '2021-05-04T12:18:24.255Z',
      },
      {
        _id: '60914e1ba87d736f3c382ed9',
        user: {
          _id: '608d55c7e512b74ee00791dd',
          displayName: 'MariamKhashab',
          firstName: 'Mariam',
          lastName: 'Khashab',
        },
        relation: 'undetermined',
        followDate: '2021-05-04T12:19:24.255Z',
      },
    ],
  },
};

module.exports.getFollowingData2 = {
  status: 'success',
  count: 1,
  data: {
    _id: '608d5450ec00005468607a0c',
    following: [
      {
        _id: '60914e1ba87d736f3c382ece',
        user: {
          _id: '608d55c7e512b74ee00791dc',
          displayName: 'AliaaKhalifa',
          firstName: 'Aliaa',
          lastName: 'Khalifa',
        },
        relation: 'friend',
        followDate: '2021-05-04T12:12:24.255Z',
      },
    ],
  },
};

module.exports.getBlockedData1 = {
  status: 'success',
  count: 2,
  data: {
    blocked: [
      {
        _id: '608d5450ec00005468607a0c',
        displayName: 'AhmedAbdulkader99',
        firstName: 'Ahmed',
        lastName: 'Abdulkader',
      },
      {
        _id: '608d55c7e512b74ee00791dc',
        displayName: 'AliaaKhalifa',
        firstName: 'Aliaa',
        lastName: 'Khalifa',
      },
    ],
    _id: '608d55c7e512b74ee00791db',
  },
};

module.exports.getBlockedData2 = {
  status: 'success',
  count: 0,
  data: {
    blocked: [],
    _id: '608d55c7e512b74ee00791dc',
  },
};

module.exports.getFavesData1 = {
  status: 'success',
  count: 2,
  data: {
    favourites: [
      {
        sizes: {
          size: {
            small: {
              height: 1000,
              width: 60,
              source: 'https://www.google.com/',
              url: 'https://www.google.com/',
            },
          },
        },
        favourites: 7,
        _id: '608d5450ec00005468607a0f',
        userId: {
          _id: '608d55c7e512b74ee00791db',
          firstName: 'Daniel',
          lastName: 'Eskandar',
        },
        title: 'Sunset in Bora Bora',
      },
      {
        sizes: {
          size: {
            small: {
              height: 1000,
              width: 60,
              source: 'https://www.google.com/',
              url: 'https://www.google.com/',
            },
          },
        },
        favourites: 51,
        _id: '608d5450ec00005468617a0c',
        userId: {
          _id: '608d55c7e512b74ee00791dc',
          firstName: 'Aliaa',
          lastName: 'Khalifa',
        },
        title: 'Sakura Season in Nihon',
      },
    ],
    _id: '608d5450ec00005468607a0c',
  },
};

module.exports.getFavesData2 = {
  status: 'success',
  count: 2,
  data: {
    favourites: [
      {
        sizes: {
          size: {
            small: {
              height: 1000,
              width: 60,
              source: 'https://www.google.com/',
              url: 'https://www.google.com/',
            },
          },
        },
        favourites: 119,
        _id: '604d5450ec00005468617a0c',
        userId: {
          _id: '608d55c7e512b74ee00791dd',
          firstName: 'Mariam',
          lastName: 'Khashab',
        },
        title: 'Wijdesteeg in Amsterdam',
      },
      {
        sizes: {
          size: {
            small: {
              height: 1000,
              width: 60,
              source: 'https://www.google.com/',
              url: 'https://www.google.com/',
            },
          },
        },
        favourites: 51,
        _id: '608d5450ec00005468617a0c',
        userId: {
          _id: '608d55c7e512b74ee00791dc',
          firstName: 'Aliaa',
          lastName: 'Khalifa',
        },
        title: 'Sakura Season in Nihon',
      },
    ],
    _id: '608d55c7e512b74ee00791db',
  },
};

module.exports.addFavesData1 = {
  status: 'success',
  data: {
    newPhotoFaveCount: {
      favourites: 120,
      _id: '604d5450ec00005468617a0c',
    },
    newUserFaveList: {
      favourites: [
        '608d5450ec00005468607a0f',
        '608d5450ec00005468617a0c',
        '604d5450ec00005468617a0c',
      ],
      _id: '608d5450ec00005468607a0c',
    },
  },
};

module.exports.addFavesData2 = {
  status: 'error',
  message: 'Photo is already in Faves',
};

module.exports.addFavesData3 = {
  status: 'success',
  data: {
    newPhotoFaveCount: {
      favourites: 8,
      _id: '608d5450ec00005468607a0f',
    },
    newUserFaveList: {
      favourites: [
        '604d5450ec00005468617a0c',
        '608d5450ec00005468617a0c',
        '608d5450ec00005468607a0f',
      ],
      _id: '608d55c7e512b74ee00791db',
    },
  },
};

module.exports.removeFavesData1 = {
  status: 'success',
  data: {
    newPhotoFaveCount: {
      favourites: 119,
      _id: '604d5450ec00005468617a0c',
    },
    newUserFaveList: {
      favourites: ['608d5450ec00005468607a0f', '608d5450ec00005468617a0c'],
      _id: '608d5450ec00005468607a0c',
    },
  },
};

module.exports.removeFavesData2 = {
  status: 'error',
  message: 'No photo is found by that ID in User faves',
};

module.exports.removeFavesData3 = {
  status: 'success',
  data: {
    newPhotoFaveCount: {
      favourites: 7,
      _id: '608d5450ec00005468607a0f',
    },
    newUserFaveList: {
      favourites: ['604d5450ec00005468617a0c', '608d5450ec00005468617a0c'],
      _id: '608d55c7e512b74ee00791db',
    },
  },
};

module.exports.getNotificationSettingsData1 = {
  status: 'success',
  data: {
    notificationSettings: {
      notifMail: {
        invites: true,
        contact: true,
        messages: true,
        reminders: true,
      },
      activityMail: {
        you: true,
        contacts: true,
      },
    },
  },
};

module.exports.getNotificationSettingsData2 = {
  status: 'success',
  data: {
    notificationSettings: {
      notifMail: {
        invites: true,
        contact: true,
        messages: true,
        reminders: true,
      },
      activityMail: {
        you: true,
        contacts: true,
      },
    },
  },
};

module.exports.getPrivacySettingsData1 = {
  status: 'success',
  data: {
    privacySettings: {
      global: {
        infoVisiblity: {
          email: 2,
          name: 1,
          currentCity: 1,
        },
        downloadPerm: 1,
        largestImgSize: 0,
        allowShare: 1,
        allowTag: 1,
        allowGalleryAdd: true,
        hideEXIF: false,
        hidePhotoSearch: false,
        hideProfileSearch: false,
      },
      defaults: {
        perms: {
          see: 1,
          comment: 1,
          addNotes: 2,
        },
        license: 0,
        mapVisible: 1,
        importEXIF: true,
        safetyLevel: 1,
        contentType: 1,
      },
      filters: {
        search: {
          safeSearch: true,
          content: 1,
        },
      },
    },
  },
};

module.exports.getPrivacySettingsData2 = {
  status: 'success',
  data: {
    privacySettings: {
      global: {
        infoVisiblity: {
          email: 2,
          name: 1,
          currentCity: 1,
        },
        downloadPerm: 1,
        largestImgSize: 0,
        allowShare: 1,
        allowTag: 1,
        allowGalleryAdd: true,
        hideEXIF: false,
        hidePhotoSearch: false,
        hideProfileSearch: false,
      },
      defaults: {
        perms: {
          see: 1,
          comment: 1,
          addNotes: 2,
        },
        license: 0,
        mapVisible: 1,
        importEXIF: true,
        safetyLevel: 1,
        contentType: 1,
      },
      filters: {
        search: {
          safeSearch: true,
          content: 1,
        },
      },
    },
  },
};
