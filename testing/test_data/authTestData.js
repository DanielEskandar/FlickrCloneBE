module.exports.signupData1 = {
  status: 'fail',
  message: 'Invalid input data. Minimum age is 13',
};

module.exports.signupData2 = {
  status: 'fail',
  message: 'Invalid input data. Invalid email address',
};

module.exports.signupData3 = {
  status: 'fail',
  message: 'Invalid input data. Weak password',
};

module.exports.signupData4 = {
  stastus: 'success',
  token: expect.any(String),
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
      _id: expect.any(String),
      firstName: 'First Name Test',
      lastName: 'Last Name Test',
      displayName: 'firstlast',
      age: 21,
      email: 'first.last@email.com',
      password: expect.any(String),
      joinDate: expect.any(String),
      following: [],
      __v: 0,
    },
  },
};

module.exports.signupData5 = {
  status: 'fail',
  message: 'Duplicate field value "firstlast". Please use another value',
};

module.exports.signinData1 = {
  status: 'fail',
  message: 'Please provide email and password',
};

module.exports.signinData2 = {
  status: 'fail',
  message: 'Invalid Email',
};

module.exports.signinData3 = {
  status: 'fail',
  message: 'Invalid Password',
};

module.exports.signinData4 = {
  status: 'success',
  token: expect.any(String),
};

module.exports.protectData1 = {
  status: 'fail',
  message: 'You are not logged in. Please log in to get access.',
};

module.exports.protectData2 = {
  status: 'fail',
  message: 'Invalid token. Please log in again.',
};

module.exports.protectData3 = {
  status: 'fail',
  message: 'Your token has expired. Please log in again',
};

module.exports.protectData4 = {
  status: 'fail',
  message: 'User changed password recently. Please log in again.',
};

module.exports.protectData5 = {
  status: 'fail',
  message: 'The user belonging to this token does not exist',
};
