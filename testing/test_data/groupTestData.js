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
    replies: ['609fe93c38075024f8d3e6f6'],
    user: '608f3e678209d433946b946d',
    content: 'La casa de papel is overrated',
    date: '2021-01-01T00:00:00.000Z',
    __v: 0,
  },
};

module.exports.getReplyData = {
  status: 'success',
  data: {
    user: '608d5450ec00005468607a0c',
    content: 'pet shops',
    date: '2021-01-01T00:00:00.000Z',
    __v: 0,
  },
};

module.exports.getAllRepliesData = {
  status: 'success',
  data: {
    replies: ['609fe93c38075024f8d3e6f5'],
  },
};

module.exports.createDiscussionData = {
  status: 'success',
  data: {
    replies: [],
    _id: '608d33c7e512b74ee00791df',
    content: 'best pastaaa ever',
    date: '2021-01-01T00:00:00.000Z',
    user: '608d55c7e512b74ee00791de',
    __v: 0,
  },
};

module.exports.editDiscussionData = {
  status: 'success',
  data: {
    replies: ['609fe93c38075024f8d3e6f6'],
    _id: '608f6e7519953b27004f6dac',
    user: '608f3e678209d433946b946d',
    content: 'edit 1',
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
    public: false,
    invitation: false,
    startDate: '2021-01-02T00:00:00.000Z',
    photos: [],
    discussionTopics: [],
    ageRestriction: false,
    _id: '609eed338a55978b34e2f061',
    name: 'backend unit test',
    users: [
      {
        joinDate: '2021-01-01T00:00:00.000Z',
        userId: '608d55c7e512b74ee00791de',
        admin: true,
      },
    ],
    __v: 0,
  },
};
