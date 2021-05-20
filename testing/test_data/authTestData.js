module.exports.signupTestData1 = {
  status: 'error',
  message: 'Invalid input data. Minimum age is 13',
};

module.exports.signupTestData2 = {
  status: 'error',
  message: 'Invalid input data. Invalid email address',
};

module.exports.signupTestData3 = {
  status: 'error',
  message: 'Invalid input data. Weak password',
};

module.exports.signupTestData5 = {
  stastus: 'success',
  token: expect.anything(),
  data: {
    user: {
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
      pro: false,
      showcase: [],
      favourites: [],
      photos: [],
      testimonials: [],
      albums: [],
      gallery: [],
      blocked: [],
      _id: expect.anything(),
      firstName: 'First Name Test',
      lastName: 'Last Name Test',
      displayName: 'firstlast',
      age: 21,
      email: 'first.last@email.com',
      password: expect.anything(),
      joinDate: expect.anything(),
      following: [],
      __v: 0,
    },
  },
};

module.exports.signupTestData6 = {
  status: 'error',
  message: 'Duplicate field value "firstlast". Please use another value',
};
