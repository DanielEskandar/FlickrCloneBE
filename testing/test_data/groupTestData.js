module.exports.getInfoData = {
  status: 'success',
  data: [
    {
      startDate: '2021-01-02T00:00:00.000Z',
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
};

module.exports.getMembersData = {
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
};

module.exports.getPhotoPoolData = {
  status: 'success',
  data: {
    photos: ['608d5450ec00005468607a0f'],
  },
};

module.exports.getAllDiscussionsData = {
  status: 'success',
  data: {
    discussionTopics: ['608f6e7519953b27004f6dab'],
  },
};

module.exports.getDiscussionData = {
  status: 'success',
  data: {
    replies: [],
    user: '608f3e678209d433946b946d',
    content: 'La casa de papel is overrated',
    date: '2021-01-01T00:00:00.000Z',
    __v: 0,
  },
};

module.exports.createDiscussionData = {
  status: 'success',
  data: {
    replies: [],
    _id: '608f3d0fb5998b4f34890a5e',
    content: 'i want fresh mango',
    date: '2020-02-02T00:00:00.000Z',
    __v: 0,
  },
};

module.exports.editDiscussionData = {
  status: 'success',
  data: {
    replies: [],
    _id: '608f6e7519953b27004f6dab',
    user: '608d5450ec00005468607a0c',
    content: 'i want pasta',
    date: '2021-01-01T00:00:00.000Z',
    __v: 0,
  },
};

module.exports.deleteDiscussionData = {
  status: 'success',
  data: null,
};

module.exports.createGroupData = {
  status: 'success',
  data: {
    public: true,
    invitation: true,
    startDate: '2021-01-01T00:00:00.000Z',
    photos: [],
    discussionTopics: [],
    ageRestriction: false,
    _id: '608f3d0fb5b8184f34890a50',
    name: 'Backend Test1',
    description: 'this is create group api test.',
    users: [],
    __v: 0,
  },
};