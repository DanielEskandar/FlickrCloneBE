module.exports.userNotFound = {
  status: 'fail',
  message: 'No user is found by that ID',
};

module.exports.presmissionDenied = {
  status: 'fail',
  message: 'Permission Denied',
};

module.exports.dataDeleted = { status: 'success', data: null };

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
    privacySettings: {
      global: {
        infoVisibility: {
          email: 2,
          currentCity: 1,
        },
      },
    },
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
    privacySettings: {
      global: {
        infoVisibility: {
          email: 2,
          currentCity: 1,
        },
      },
    },
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
      favourites: 52,
      _id: '608d5450ec00005468628a0d',
    },
    newUserFaveList: {
      favourites: [
        '608d5450ec00005468607a0f',
        '608d5450ec00005468617a0c',
        '608d5450ec00005468628a0d',
      ],
      _id: '608d5450ec00005468607a0c',
    },
  },
};

module.exports.addFavesData2 = {
  status: 'fail',
  message: 'Photo is already in Faves',
};

module.exports.addFavesData3 = {
  status: 'success',
  data: {
    newPhotoFaveCount: {
      favourites: 53,
      _id: '608d5450ec00005468628a0d',
    },
    newUserFaveList: {
      favourites: [
        '604d5450ec00005468617a0c',
        '608d5450ec00005468617a0c',
        '608d5450ec00005468628a0d',
      ],
      _id: '608d55c7e512b74ee00791db',
    },
  },
};

module.exports.removeFavesData1 = {
  status: 'success',
  data: {
    newPhotoFaveCount: {
      favourites: 52,
      _id: '608d5450ec00005468628a0d',
    },
    newUserFaveList: {
      favourites: ['608d5450ec00005468607a0f', '608d5450ec00005468617a0c'],
      _id: '608d5450ec00005468607a0c',
    },
  },
};

module.exports.removeFavesData2 = {
  status: 'fail',
  message: 'No photo is found by that ID in User faves',
};

module.exports.removeFavesData3 = {
  status: 'success',
  data: {
    newPhotoFaveCount: {
      favourites: 51,
      _id: '608d5450ec00005468628a0d',
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
        infoVisibility: {
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
        infoVisibility: {
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

module.exports.getTestimonialsData = {
  status: 'success',
  data: {
    testimonials: [
      {
        _id: '60a78931879c9b4f08aec669',
        by: {
          _id: '608d5450ec00005468607a0c',
          firstName: 'Ahmed',
          lastName: 'Abdulkader',
        },
        content: 'Testimonial about tetimonial test user from Ahmed',
      },
      {
        _id: '60a78931879c9b4f08aec66a',
        by: {
          _id: '608d55c7e512b74ee00791db',
          firstName: 'Daniel',
          lastName: 'Eskandar',
        },
        content: 'Testimonial about testimonial test user from Daniel',
      },
    ],
    _id: '60a787449065c85bac893ab3',
  },
};

module.exports.addTestimonialData = {
  status: 'success',
  data: {
    _id: expect.any(String),
    by: '608d55c7e512b74ee00791dc',
    about: '60a787449065c85bac893ab3',
    content: 'A testimonial from Alia',
    __v: 0,
  },
};

module.exports.updatePrivacySettingsBody = {
  privacySettings: {
    global: {
      infoVisibility: {
        email: 2,
        name: 1,
        currentCity: 1,
      },
      downloadPerm: 1,
      largestImgSize: 0,
      allowShare: 2,
      allowTag: 2,
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
};

module.exports.updatePrivacySettingsData = {
  status: 'success',
  data: {
    privacySettings: {
      global: {
        infoVisibility: {
          email: 2,
          name: 1,
          currentCity: 1,
        },
        downloadPerm: 1,
        largestImgSize: 0,
        allowShare: 2,
        allowTag: 2,
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

module.exports.updateNotificationSettingsBody = {
  notificationSettings: {
    notifMail: {
      invites: false,
      contact: false,
      messages: true,
      reminders: true,
    },
    activityMail: {
      you: true,
      contacts: true,
    },
  },
};

module.exports.updateNotificationSettingsData = {
  status: 'success',
  data: {
    notificationSettings: {
      notifMail: {
        invites: false,
        contact: false,
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

module.exports.getShowcaseData = {
  status: 'success',
  data: {
    showcase: [
      {
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
      {
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
        _id: '608d5450ec00005468617a0c',
      },
    ],
    _id: '608d5450ec00005468607a0c',
  },
};

module.exports.updateShowcaseBody = {
  showcase: [
    '608d5450ec00005468607a0f',
    '608d5450ec00005468617a0c',
    '608d5450ec00005468628a0d',
  ],
};

module.exports.updateShowcaseData = {
  status: 'success',
  data: {
    showcase: [
      '608d5450ec00005468607a0f',
      '608d5450ec00005468617a0c',
      '608d5450ec00005468628a0d',
    ],
  },
};

module.exports.updateDispNameData1 = {
  status: 'success',
  data: {
    displayName: 'displayname2',
  },
};

module.exports.updateDispNameData2 = {
  status: 'fail',
  message: 'Duplicate field value "DanielEskandar". Please use another value',
};

module.exports.getAboutMeData = {
  status: 'success',
  data: {
    aboutMe: 'Hello! I take nice photos.. follow me ":)',
  },
};

module.exports.udpateUserInfoData = {
  status: 'success',
  data: {
    privacySettings: {
      global: {
        infoVisibility: {
          email: 1,
          currentCity: 2,
        },
      },
    },
    _id: '608d55c7e512b74ee00791db',
    occupation: 'Artist',
    hometown: 'Ile de France',
    currentCity: 'Berlin',
    country: 'Germany',
  },
};

module.exports.updateAboutMeData = {
  status: 'success',
  data: {
    aboutMe: 'new about me content',
  },
};

module.exports.searchData1 = {
  status: 'success',
  data: [
    {
      _id: '60b1619d62e64a359ccb4a63',
      firstName: 'dummy3',
      lastName: 'search1',
      displayName: 'dummy4',
    },
    {
      _id: '60b1619d62e64a359ccb4a64',
      firstName: 'dummy5',
      lastName: 'dummy6',
      displayName: 'search1',
    },
    {
      _id: '60b1619d62e64a359ccb4a62',
      firstName: 'search1',
      lastName: 'dummy1',
      displayName: 'dummy2',
    },
  ],
};

module.exports.searchData2 = {
  status: 'success',
  data: [
    {
      _id: '60b1619d62e64a359ccb4a66',
      firstName: 'search2',
      lastName: 'search3',
      displayName: 'dummy7',
    },
  ],
};

module.exports.searchData3 = {
  status: 'success',
  data: [
    {
      _id: '60b1619d62e64a359ccb4a63',
      firstName: 'dummy3',
      lastName: 'search1',
      displayName: 'dummy4',
    },
    {
      _id: '60b1619d62e64a359ccb4a62',
      firstName: 'search1',
      lastName: 'dummy1',
      displayName: 'dummy2',
    },
  ],
};

module.exports.searchData4 = {
  status: 'success',
  data: [
    {
      _id: '60b1619d62e64a359ccb4a64',
      firstName: 'dummy5',
      lastName: 'dummy6',
      displayName: 'search1',
    },
  ],
};

module.exports.searchData5 = {
  status: 'success',
  data: [],
};

module.exports.getPhotoStream = {
  status: 'success',
  data: {
    photos: {
      photos: [
        {
          permissions: {
            public: true,
            friend: false,
            family: false,
            comment: 2,
            addMeta: 1,
          },
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
        {
          permissions: {
            public: true,
            friend: false,
            family: false,
            comment: 2,
            addMeta: 1,
          },
          sizes: {
            size: {
              original: {
                height: 100,
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
          _id: '604d5450ec01005468617a04',
        },
      ],
      _id: '608d5450ec00005468607a11',
    },
  },
};

module.exports.getCameraRoll = {
  status: 'success',
  data: {
    photos: {
      photos: [
        {
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
          _id: '608d5450ec00005468617a0c',
        },
        {
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
        {
          sizes: {
            size: {
              original: {
                height: 100,
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
          _id: '604d5450ec01005468617a04',
        },
        {
          sizes: {
            size: {
              original: {
                height: 100,
                width: 60,
                source: 'http://www.nyan.cat/',
                url: 'https://www.google.com/',
              },
              large: {
                height: 190,
                width: 20,
                source: 'https://www.google.com/',
                url: 'http://www.nyan.cat/',
              },
              medium800: {
                height: 350,
                width: 600,
                source: 'https://www.google.com/',
                url: 'https://thispersondoesnotexist.com/',
              },
              medium640: {
                height: 1200,
                width: 60,
                source: 'https://thispersondoesnotexist.com/',
                url: 'https://www.google.com/',
              },
              medium: {
                height: 120,
                width: 600,
                source: 'https://www.google.com/',
                url: 'https://www.youtube.com/watch?v=2AY4ngaybWI',
              },
              small320: {
                height: 12,
                width: 60,
                source: 'https://www.youtube.com/watch?v=2AY4ngaybWI',
                url: 'https://www.youtube.com/watch?v=2AY4ngaybWI',
              },
              small: {
                height: 3500,
                width: 600,
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
                height: 100,
                width: 120,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
              square: {
                height: 3500,
                width: 3500,
                source: 'https://www.google.com/',
                url: 'https://www.google.com/',
              },
            },
            canDownload: true,
          },
          _id: '604d5450ec01005468617a14',
        },
        {
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
          _id: '608d5450ec00005468628a0d',
        },
      ],
      _id: '608d5450ec00005468607a11',
    },
  },
};
