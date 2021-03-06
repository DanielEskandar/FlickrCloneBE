// INCLUDE DEPENDENCIES
const _ = require('underscore');

// INCLUDE MODELS
const userModel = require('../models/userModel.js');
const photoModel = require('../models/photoModel.js');

// eslint-disable-next-line no-unused-vars
const albumModel = require('../models/albumModel.js');
// eslint-disable-next-line no-unused-vars
const galleryModel = require('../models/galleryModel.js');

const testimonialModel = require('../models/testimonialModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// INCLUDE API FEATURES
const APIFeatures = require('../utils/APIFeatures.js');

// GET REAL NAME
exports.getRealName = async (req, res) => {
  try {
    const realName = await userModel
      .findById(req.params.id)
      .select({ firstName: 1, lastName: 1, _id: 0 });

    if (!realName) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(realName)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET DISPLAY NAME
exports.getDispName = async (req, res) => {
  try {
    const dispName = await userModel
      .findById(req.params.id)
      .select({ displayName: 1, _id: 0 });

    if (!dispName) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(dispName)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE DISPLAY NAME
exports.updateDispName = async (req, res) => {
  try {
    const dispName = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { displayName: req.body.displayName },
        { new: true, runValidators: true }
      )
      .select({ displayName: 1, _id: 0 });

    if (!dispName) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(dispName)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET USER INFO
exports.getUserInfo = async (req, res) => {
  try {
    const userInfo = await userModel.findById(req.params.id).select({
      joinDate: 1,
      occupation: 1,
      hometown: 1,
      currentCity: 1,
      country: 1,
      email: 1,
      'privacySettings.global.infoVisibility.email': 1,
      'privacySettings.global.infoVisibility.currentCity': 1,
      _id: 0,
    });

    if (!userInfo) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(userInfo)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET LIMITS
exports.getLimits = async (req, res) => {
  try {
    const limits = await userModel
      .findById(req.user.id)
      .select({ limits: 1, _id: 0 });

    if (!limits) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(limits)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET FOLLOWING
exports.getFollowing = async (req, res) => {
  try {
    const following = await userModel
      .findById(req.params.id)
      .select({ following: 1 })
      .populate('following.user', 'displayName firstName lastName');

    if (!following) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      count: following.following.length,
      data: JSON.parse(JSON.stringify(following)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET BLOCKED
exports.getBlocked = async (req, res) => {
  try {
    const blocked = await userModel
      .findById(req.user.id)
      .select({ blocked: 1 })
      .populate('blocked', 'displayName firstName lastName');

    if (!blocked) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      count: blocked.blocked.length,
      data: JSON.parse(JSON.stringify(blocked)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET FAVES
exports.getFaves = async (req, res) => {
  try {
    const favourites = await userModel
      .findById(req.params.id)
      .select({ favourites: 1 })
      .populate({
        path: 'favourites',
        model: 'photoModel',
        select: 'title favourites userId sizes.size.small',
        populate: {
          path: 'userId',
          model: 'userModel',
          select: 'firstName lastName',
        },
      });

    if (!favourites) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      count: favourites.favourites.length,
      data: JSON.parse(JSON.stringify(favourites)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD TO FAVES
exports.addFave = async (req, res) => {
  try {
    // Check for existence of Photo
    if ((await photoModel.findById(req.params.id)) === null) {
      throw new AppError('No photo is found by that ID', 404);
    }

    if ((await userModel.findById(req.user.id)) === null) {
      throw new AppError('No user is found by that ID', 404);
    }

    if (
      (await userModel.findOne({
        _id: req.user.id,
        favourites: { $elemMatch: { $eq: req.params.id } },
      })) !== null
    ) {
      throw new AppError('Photo is already in Faves', 409);
    }

    //Increase Fave Count on Photo Model
    const updatedFaveCount = await photoModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $inc: { favourites: 1 },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({ favourites: 1 });

    // Add PhotoID to Faves array in User model
    const updatedFaves = await userModel
      .findByIdAndUpdate(
        req.user.id,
        {
          $addToSet: { favourites: req.params.id },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({ favourites: 1 });

    const Updates = {
      newPhotoFaveCount: JSON.parse(JSON.stringify(updatedFaveCount)),
      newUserFaveList: JSON.parse(JSON.stringify(updatedFaves)),
    };

    res.status(200).json({
      status: 'success',
      data: Updates,
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// REMOVE FROM FAVES
exports.removeFave = async (req, res) => {
  try {
    const faveList = await userModel
      .findById(req.user.id)
      .select({ favourites: 1 });

    if (!faveList) {
      throw new AppError('No user is found by that ID', 404);
    }

    // Check if the Photo exits in User's Faves
    const favePhoto = faveList.favourites.find(
      (el) => el.toString() === req.params.id.toString()
    );

    if (favePhoto !== undefined) {
      //Decrease Fave Count on Photo Model
      const updatedFaveCount = await photoModel
        .findByIdAndUpdate(
          req.params.id,
          {
            $inc: { favourites: -1 },
          },
          {
            new: true,
            runValidators: true,
          }
        )
        .select({ favourites: 1 });

      // Remove PhotoID from Faves array in User model
      const updatedFaves = await userModel
        .findByIdAndUpdate(
          req.user.id,
          {
            $pull: { favourites: req.params.id },
          },
          {
            new: true,
            runValidators: true,
          }
        )
        .select({ favourites: 1 });

      const Updates = {
        newPhotoFaveCount: JSON.parse(JSON.stringify(updatedFaveCount)),
        newUserFaveList: JSON.parse(JSON.stringify(updatedFaves)),
      };

      res.status(200).json({
        status: 'success',
        data: Updates,
      });
    } else {
      throw new AppError('No photo is found by that ID in User faves', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET NOTIFICATION SETTINGS
exports.getNotificationSettings = async (req, res) => {
  try {
    const notificationSettings = await userModel
      .findById(req.user.id)
      .select({ notificationSettings: 1, _id: 0 });

    if (!notificationSettings) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(notificationSettings)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET PRIVACY SETTINGS
exports.getPrivacySettings = async (req, res) => {
  try {
    const privacySettings = await userModel
      .findById(req.user.id)
      .select({ privacySettings: 1, _id: 0 });

    if (!privacySettings) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(privacySettings)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET TESTIMONIALS
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await userModel
      .findById(req.params.id)
      .select({ testimonials: 1 })
      .populate({
        path: 'testimonials',
        model: 'testimonialModel',
        select: 'by content',
        populate: {
          path: 'by',
          model: 'userModel',
          select: 'firstName lastName',
        },
      });

    if (!testimonials) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(testimonials)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD TESTIMONIAL
exports.addTestimonial = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      throw new AppError('No user is found by that ID', 404);
    }

    // Create a new testimonial
    const testimonial = await testimonialModel.create({
      by: req.user.id,
      about: req.params.id,
      content: req.body.message,
    });

    // Add testimonial id to the user who wrote the testimonial
    await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { testimonials: testimonial._id },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(testimonial)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// REMOVE TESTIMONIAL
exports.removeTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialModel.findById(
      req.params.testimonialId
    );

    if (!testimonial) {
      throw new AppError('No testimonial is found by that ID', 404);
    }

    // The user who is trying the delete the testimonial is not the user who wrote it or received it
    if (
      !(
        req.user.id.toString() === testimonial.by.toString() ||
        req.user.id.toString() === testimonial.about.toString()
      )
    ) {
      throw new AppError('Permission Denied', 401);
    }

    // Remove the testimonial from the testimonials array of the user who had the testimonial
    await userModel.findByIdAndUpdate(
      testimonial.about,
      { $pull: { testimonials: testimonial._id } },
      { new: true, runValidators: true }
    );

    // Remove the testimonial itself
    await testimonialModel.findOneAndDelete({ _id: req.params.testimonialId });

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE PRIVACY SETTINGS
exports.updatePrivacySettings = async (req, res) => {
  try {
    const privacySettings = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { privacySettings: req.body.privacySettings },
        { new: true, runValidators: true }
      )
      .select({ privacySettings: 1, _id: 0 });

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(privacySettings)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE NOTIFICATION SETTINGS
exports.updateNotificationSettings = async (req, res) => {
  try {
    const notificationSettings = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { notificationSettings: req.body.notificationSettings },
        { new: true, runValidators: true }
      )
      .select({ notificationSettings: 1, _id: 0 });

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(notificationSettings)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET SHOWCASE
exports.getShowcase = async (req, res) => {
  try {
    const showcase = await userModel
      .findById(req.params.id)
      .select({ showcase: 1 })
      .populate({
        path: 'showcase',
        model: 'photoModel',
        select: 'sizes',
      });

    if (!showcase) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(showcase)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE SHOWCASE
exports.updateShowcase = async (req, res) => {
  try {
    const showcase = await userModel
      .findByIdAndUpdate(
        req.user.id,
        {
          showcase: req.body.showcase,
        },
        { new: true, runValidators: true }
      )
      .select({ showcase: 1, _id: 0 });

    if (!showcase) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(showcase)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET ABOUT ME
exports.getAboutMe = async (req, res) => {
  try {
    const aboutMe = await userModel
      .findById(req.params.id)
      .select({ aboutMe: 1, _id: 0 });

    if (!aboutMe) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(aboutMe)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE USER INFO
exports.updateUserInfo = async (req, res) => {
  try {
    const userInfo = await userModel
      .findByIdAndUpdate(
        req.user.id,
        {
          occupation: req.body.occupation,
          hometown: req.body.hometown,
          currentCity: req.body.currentCity,
          country: req.body.country,
          'privacySettings.global.infoVisibility.email':
            req.body.emailVisibility,
          'privacySettings.global.infoVisibility.currentCity':
            req.body.currentCityVisibility,
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({
        occupation: 1,
        hometown: 1,
        currentCity: 1,
        country: 1,
        'privacySettings.global.infoVisibility.email': 1,
        'privacySettings.global.infoVisibility.currentCity': 1,
      });

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(userInfo)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE ABOUT ME
exports.updateAboutMe = async (req, res) => {
  try {
    const aboutMe = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { aboutMe: req.body.aboutMe },
        { new: true, runValidators: true }
      )
      .select({ aboutMe: 1, _id: 0 });

    if (!aboutMe) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(aboutMe)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// SEARCH
exports.search = async (req, res) => {
  try {
    // Check if query exists
    if (!req.query.searchText) {
      throw new AppError('No query found.', 400);
    }

    // Split query on space character
    const queries = req.query.searchText.split(' ');

    // Search for users
    const searchResults = [];
    await Promise.all(
      queries.map(async (el) => {
        const searchResult = await userModel.aggregate([
          {
            $match: {
              $or: [{ firstName: el }, { lastName: el }, { displayName: el }],
            },
          },
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              displayName: 1,
              photoCount: { $size: '$photos' },
            },
          },
        ]);

        searchResults.push(searchResult);
      })
    );

    // Calculate intersection of the results of the queries
    let results = [];
    if (searchResults) {
      results = searchResults[0];
      searchResults.forEach((el) => {
        results = results.filter((item1) =>
          el.some((item2) => item1.displayName === item2.displayName)
        );
      });

      // SORTING
      results = _.sortBy(results, 'firstName');

      // Pagination
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 100;
      results = APIFeatures.paginate(results, page, limit);

      // Get FollowerCount
      await Promise.all(
        results.map(async (el) => {
          const user = await userModel.aggregate([
            {
              $match: {
                'following.user': el._id,
              },
            },
            {
              $group: {
                _id: null,
                followerCount: { $sum: 1 },
              },
            },
          ]);
          if (user.length === 1) {
            el.followerCount = user[0].followerCount;
          } else {
            el.followerCount = 0;
          }
        })
      );
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(results)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// Get Photostream
exports.getPhotoStream = async (req, res) => {
  try {
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;
    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of photos to return per page is 500',
        404
      );
    }
    let photos = [];
    // if requested user == calling user
    // ALL PHOTOS ARE RETURNED
    if (req.params.id === req.user.id) {
      photos = await userModel
        .findById(req.params.id)
        .populate('photos', 'sizes')
        .select('photos')
        .skip(skip)
        .limit(perPage);
    } else {
      //   // get requested user's following list

      const userFollowing = await userModel
        .findById(req.params.id)
        .select('following');
      // get relation (if exist) between requested user and calling user
      const relation = userFollowing.following.filter(
        (follow) => follow.user.toString() === req.user.id.toString()
      );

      // if stranger of undetermined -> public only
      if (relation.length === 0 || relation[0].relation === 'undetermined') {
        photos = await userModel
          .findById(req.params.id)
          .populate('photos', ['permissions', 'sizes'], {
            'permissions.public': true,
          })
          .select('photos')
          .skip(skip)
          .limit(perPage);

        // if friend -> public and friend
      } else if (relation[0].relation === 'friend') {
        photos = await userModel
          .findById(req.params.id)
          .populate('photos', ['permissions', 'sizes'], {
            $or: [
              {
                'permissions.public': true,
              },
              { 'permissions.friend': true },
            ],
          })
          .select('photos')
          .skip(skip)
          .limit(perPage);
        // if family -> public and family
      } else if (relation[0].relation === 'family') {
        photos = await userModel
          .findById(req.params.id)
          .populate('photos', ['permissions', 'sizes'], {
            $or: [
              {
                'permissions.public': true,
              },
              { 'permissions.family': true },
            ],
          })
          .select('photos')
          .skip(skip)
          .limit(perPage);
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        photos: JSON.parse(JSON.stringify(photos)),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// Get Camera-Roll
exports.getCameraRoll = async (req, res) => {
  try {
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of photos to return per page is 500',
        404
      );
    }
    const userPhotos = await userModel
      .findById(req.user.id)
      .populate('photos', 'sizes')
      .select('photos')
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: 'success',
      data: {
        photos: JSON.parse(
          // eslint-disable-next-line no-unused-vars
          JSON.stringify(userPhotos)
        ),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

exports.getRecentPhotos = async (req, res) => {
  try {
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of photos to return per page is 500',
        404
      );
    }
    const userPhotos = await userModel
      .findById(req.user.id)
      .populate({
        path: 'photos',
        select: ['title', 'dateUploaded', 'sizes', 'favourites', 'userId'],
        populate: {
          path: 'userId',
          model: 'userModel',
          select: ['firstName', 'lastName', 'displayName'],
        },
        options: { sort: '-dateUploaded' }, // DESCENDING SORT
      })
      .select('photos')
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: 'success',
      data: {
        photos: JSON.parse(
          // eslint-disable-next-line no-unused-vars
          JSON.stringify(userPhotos)
        ),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

exports.getPopularPhotos = async (req, res) => {
  try {
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of photos to return per page is 500',
        404
      );
    }
    const userPhotos = await userModel
      .findById(req.user.id)
      .populate({
        path: 'photos',
        select: ['title', 'dateUploaded', 'sizes', 'favourites', 'userId'],
        populate: {
          path: 'userId',
          model: 'userModel',
          select: ['firstName', 'lastName', 'displayName'],
        },
        options: { sort: '-favourites' }, // DESCENDING SORT
      })
      .select('photos')
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: 'success',
      data: {
        photos: JSON.parse(
          // eslint-disable-next-line no-unused-vars
          JSON.stringify(userPhotos)
        ),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

exports.getRequestedUserRecentPhotos = async (req, res) => {
  try {
    if (!(await userModel.findById(req.params.id))) {
      throw new AppError('No User Found with This ID', 404);
    }
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of photos to return per page is 500',
        404
      );
    }
    const userPhotos = await userModel
      .findById(req.params.id)
      .populate({
        path: 'photos',
        select: ['title', 'dateUploaded', 'sizes', 'favourites', 'userId'],
        populate: {
          path: 'userId',
          model: 'userModel',
          select: ['firstName', 'lastName', 'displayName'],
        },
        options: { sort: '-dateUploaded' }, // DESCENDING SORT
      })
      .select('photos')
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: 'success',
      data: {
        photos: JSON.parse(
          // eslint-disable-next-line no-unused-vars
          JSON.stringify(userPhotos)
        ),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

exports.getRequestedUserPopularPhotos = async (req, res) => {
  try {
    if (!(await userModel.findById(req.params.id))) {
      throw new AppError('No User Found with This ID', 404);
    }
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of photos to return per page is 500',
        404
      );
    }
    const userPhotos = await userModel
      .findById(req.params.id)
      .populate({
        path: 'photos',
        select: ['title', 'dateUploaded', 'sizes', 'favourites', 'userId'],
        populate: {
          path: 'userId',
          model: 'userModel',
          select: ['firstName', 'lastName', 'displayName'],
        },
        options: { sort: '-favourites' }, // DESCENDING SORT
      })
      .select('photos')
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: 'success',
      data: {
        photos: JSON.parse(
          // eslint-disable-next-line no-unused-vars
          JSON.stringify(userPhotos)
        ),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// getRequestedUserGalleries
exports.getRequestedUserGalleries = async (req, res) => {
  try {
    if (!(await userModel.findById(req.params.id))) {
      throw new AppError('No User Found with This ID', 404);
    }
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of galleries to return per page is 500',
        404
      );
    }
    const userGalleries = await userModel
      .findById(req.params.id)
      .populate([
        {
          path: 'gallery',
          model: 'galleryModel',
          select: ['photos', 'primaryPhotoId', 'galleryName'],
          populate: [
            {
              path: 'photos.photoId',
              model: 'photoModel',
              select: 'sizes',
            },
            {
              path: 'primaryPhotoId',
              model: 'photoModel',
              select: 'sizes',
            },
          ],
        },
      ])
      .select('gallery')
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: 'success',
      data: JSON.parse(
        // eslint-disable-next-line no-unused-vars
        JSON.stringify(userGalleries)
      ),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// getRequestedUserAlbums
exports.getRequestedUserAlbums = async (req, res) => {
  try {
    if (!(await userModel.findById(req.params.id))) {
      throw new AppError('No User Found with This ID', 404);
    }
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of albums to return per page is 500',
        404
      );
    }
    let userAlbums = await userModel
      .findById(req.params.id)
      .populate([
        {
          path: 'albums',
          model: 'albumModel',
          select: ['photos', 'primaryPhotoId', 'albumName'],
          populate: [
            {
              path: 'photos',
              model: 'photoModel',
              select: 'sizes',
            },
            {
              path: 'primaryPhotoId',
              model: 'photoModel',
              select: 'sizes',
            },
          ],
        },
      ])
      .select('albums')
      .skip(skip)
      .limit(perPage);

    userAlbums = userAlbums.albums.map((album) => ({
      album,
      photoCount: album.photos.length,
    }));

    res.status(200).json({
      status: 'success',
      data: JSON.parse(
        // eslint-disable-next-line no-unused-vars
        JSON.stringify(userAlbums)
      ),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// getGalleries
exports.getGalleries = async (req, res) => {
  try {
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of galleries to return per page is 500',
        404
      );
    }
    const userGalleries = await userModel
      .findById(req.user.id)
      .populate([
        {
          path: 'gallery',
          model: 'galleryModel',
          select: ['photos', 'primaryPhotoId', 'galleryName'],
          populate: [
            {
              path: 'photos.photoId',
              model: 'photoModel',
              select: 'sizes',
            },
            {
              path: 'primaryPhotoId',
              model: 'photoModel',
              select: 'sizes',
            },
          ],
        },
      ])
      .select('gallery')
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: 'success',
      data: JSON.parse(
        // eslint-disable-next-line no-unused-vars
        JSON.stringify(userGalleries)
      ),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// getAlbums
exports.getAlbums = async (req, res) => {
  try {
    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (perPage > 500) {
      throw new AppError(
        'Maximum allowed value of number of albums to return per page is 500',
        404
      );
    }
    let userAlbums = await userModel
      .findById(req.user.id)
      .populate([
        {
          path: 'albums',
          model: 'albumModel',
          select: ['photos', 'primaryPhotoId', 'albumName'],
          populate: [
            {
              path: 'photos',
              model: 'photoModel',
              select: 'sizes',
            },
            {
              path: 'primaryPhotoId',
              model: 'photoModel',
              select: 'sizes',
            },
          ],
        },
      ])
      .select('albums')
      .skip(skip)
      .limit(perPage);

    userAlbums = userAlbums.albums.map((album) => ({
      album,
      photoCount: album.photos.length,
    }));

    res.status(200).json({
      status: 'success',
      data: JSON.parse(
        // eslint-disable-next-line no-unused-vars
        JSON.stringify(userAlbums)
      ),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// getStats
exports.getStats = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .populate('photos', 'views tags')
      .select(['photos', 'favourites']);

    if (!user) {
      throw new AppError('No User Found with This ID', 404);
    }

    const userFavesCount = user.favourites.length;
    const userViewsCount = user.photos
      .map((photo) => photo.views)
      .reduce((sum, photo) => sum + photo);

    const userTagCount = user.photos
      .map((photo) => photo.tags.length)
      .reduce((sum, photo) => sum + photo);

    const stats = {
      views: userViewsCount,
      faves: userFavesCount,
      tags: userTagCount,
    };

    res.status(200).json({
      status: 'success',
      data: JSON.parse(
        // eslint-disable-next-line no-unused-vars
        JSON.stringify(stats)
      ),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
